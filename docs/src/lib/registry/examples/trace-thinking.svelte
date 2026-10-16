<script lang="ts">
	import BrainIcon from "@lucide/svelte/icons/brain";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIMessage } from "ai";

	const script = createChat()
		.user("Why is the checkout deploy so slow?")
		.assistant(({ writer }) => {
			writer.reasoning(
				"The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
				{ delayMs: 60 }
			);
			writer.sleep(400);
			writer.text(
				"Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash."
			);
		});

	const initialMessages = script.get(0);
	const transport = script.transport({ delayMs: 20 });

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
</script>

{#snippet thinkingLine(running: boolean)}
	<Trace.Line status={running ? "running" : undefined}>
		<Trace.Icon>
			<BrainIcon />
		</Trace.Icon>
		<Trace.Title>{running ? "Thinking" : "Thought"}</Trace.Title>
	</Trace.Line>
{/snippet}

{#snippet thinkingTrace(id: string, text: string, running: boolean)}
	{#if text.length === 0}
		{@render thinkingLine(running)}
	{:else}
		<Trace.Collapsible
			open={thinkingOpen[id] ?? running}
			onOpenChange={(open) => (thinkingOpen[id] = open)}
		>
			<Trace.CollapsibleTrigger>{@render thinkingLine(running)}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{text}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

<div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
	{#each chat.messages as message (message.id)}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			{@const live = chat.status === "streaming" && message === chat.messages.at(-1)}
			<Message.Root>
				<Message.Content class="gap-4">
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
									<p>{part.text}</p>
								{/if}
							{/each}
						{/if}
					{/each}
				</Message.Content>
			</Message.Root>
		{/if}
	{/each}
	{#if !busy}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			onclick={() => {
				if (nextMessage) {
					void chat.sendMessage(nextMessage);
				} else {
					thinkingOpen = {};
					chat.messages = initialMessages;
				}
			}}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
