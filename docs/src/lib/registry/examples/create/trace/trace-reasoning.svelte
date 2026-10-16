<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import type { UIMessage } from "ai";

	const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`;

	const script = createChat()
		.user("Why is the checkout deploy so slow?")
		.assistant(({ writer }) => {
			writer.reasoning(REASONING, { delayMs: 60 });
			writer.sleep(400);
			writer.text(
				"Image optimization is the bottleneck. It reruns on every deploy because the cache key includes the commit hash. Key it on the lockfile and the image directory instead."
			);
		});

	const initialMessages = script.get(0);
	const transport = script.transport({
		delayMs: 20,
	});

	const chat = new Chat({ messages: initialMessages, transport });
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	// The reader's choice for each thinking row. Until they click, it follows `running`.
	let thinkingOpen = $state<Record<string, boolean>>({});

	function groupParts(parts: UIMessage["parts"]) {
		const runs: { trace: boolean; parts: UIMessage["parts"] }[] = [];

		for (const part of parts) {
			const trace = part.type === "reasoning";

			if (!trace && part.type !== "text") {
				continue;
			}

			const last = runs.at(-1);

			if (last?.trace === trace) {
				last.parts.push(part);
			} else {
				runs.push({ trace, parts: [part] });
			}
		}

		return runs;
	}

	function handleClick() {
		if (nextMessage) {
			void chat.sendMessage(nextMessage);
			return;
		}

		thinkingOpen = {};
		chat.messages = initialMessages;
	}
</script>

{#snippet thinkingTrace(id: string, text: string, running: boolean)}
	<Trace.Collapsible
		open={thinkingOpen[id] ?? (running && text.length > 0)}
		onOpenChange={(open) => (thinkingOpen[id] = open)}
	>
		<Trace.CollapsibleTrigger>
			<Trace.Line status={running ? "running" : undefined}>
				<Trace.Title>{running ? "Thinking" : "Thought"}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="whitespace-pre-wrap">
			{text}
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
{/snippet}

<Example title="Reasoning">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Title>Thought for 12 seconds</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{REASONING}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<div class="flex min-h-80 flex-col gap-4 border-t pt-8">
			{#each chat.messages as message (message.id)}
				{@const live = chat.status === "streaming" && message === chat.messages.at(-1)}
				{#each groupParts(message.parts) as run, runIndex (runIndex)}
					{#if run.trace}
						<Trace.Root>
							{#each run.parts as part, index (index)}
								{#if part.type === "reasoning"}
									{@render thinkingTrace(
										`${message.id}-${runIndex}-${index}`,
										part.text,
										live && part.state === "streaming"
									)}
								{/if}
							{/each}
						</Trace.Root>
					{:else}
						{#each run.parts as part, index (`${runIndex}-${index}`)}
							{#if part.type === "text"}
								<p
									class={message.role === "user"
										? "text-sm font-medium"
										: "text-sm leading-relaxed"}
								>
									{part.text}
								</p>
							{/if}
						{/each}
					{/if}
				{/each}
			{/each}
			<Button
				variant="outline"
				size="sm"
				class="mt-auto self-start"
				disabled={busy}
				onclick={handleClick}
			>
				{nextMessage ? "Send message" : "Reset"}
			</Button>
		</div>
	</div>
</Example>
