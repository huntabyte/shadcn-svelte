<script lang="ts">
	import BrainIcon from "@lucide/svelte/icons/brain";
	import { onDestroy } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { getMessageText, splitTextDeltas, wait } from "$lib/ai.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type Part =
		| { type: "text"; text: string }
		| { type: "reasoning"; text: string; state: "streaming" | "done" };

	type ChatMessage = { id: string; role: "user" | "assistant"; parts: Part[] };

	type Step =
		| { type: "reasoning"; text: string; delayMs: number }
		| { type: "text"; text: string; delayMs: number }
		| { type: "sleep"; delayMs: number };

	const question: ChatMessage = {
		id: "user-1",
		role: "user",
		parts: [{ type: "text", text: "Why is the checkout deploy so slow?" }],
	};

	const steps: Step[] = [
		{
			type: "reasoning",
			text: "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
			delayMs: 60,
		},
		{ type: "sleep", delayMs: 400 },
		{
			type: "text",
			text: "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash.",
			delayMs: 20,
		},
	];

	let messages = $state<ChatMessage[]>([]);
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	// Open state the user picked for each thinking row, keyed by message and part.
	let openRows = $state<Record<string, boolean>>({});
	let generation = 0;

	const nextMessage = $derived(
		messages.some((message) => message.id === question.id) ? null : question
	);
	const busy = $derived(status === "submitted" || status === "streaming");

	async function sendMessage(message: ChatMessage) {
		const run = ++generation;
		messages.push(structuredClone(message));
		status = "submitted";

		messages.push({ id: "assistant-1", role: "assistant", parts: [] });
		const assistant = messages[messages.length - 1];
		status = "streaming";

		for (const step of steps) {
			if (step.type === "sleep") {
				await wait(step.delayMs);
				if (run !== generation) return;
				continue;
			}

			assistant.parts.push(
				step.type === "reasoning"
					? { type: "reasoning", text: "", state: "streaming" }
					: { type: "text", text: "" }
			);
			const part = assistant.parts[assistant.parts.length - 1];

			for (const delta of splitTextDeltas(step.text)) {
				await wait(step.delayMs);
				if (run !== generation) return;
				part.text += delta;
			}

			if (part.type === "reasoning") {
				part.state = "done";
			}
		}

		status = "ready";
	}

	function reset() {
		generation += 1;
		status = "ready";
		openRows = {};
		messages = [];
	}

	onDestroy(() => {
		generation += 1;
	});

	function groupParts(parts: Part[]) {
		const runs: { trace: boolean; parts: Part[] }[] = [];

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

{#snippet thinkingTrace(text: string, running: boolean, key: string)}
	{#if text.length === 0}
		{@render thinkingLine(running)}
	{:else}
		<Trace.Collapsible
			open={openRows[key] ?? running}
			onOpenChange={(open) => (openRows[key] = open)}
		>
			<Trace.CollapsibleTrigger>{@render thinkingLine(running)}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{text}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

<div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
	{#each messages as message (message.id)}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			{@const live = status === "streaming" && message.id === messages.at(-1)?.id}
			<Message.Root>
				<Message.Content class="gap-4">
					{#each groupParts(message.parts) as run, runIndex (runIndex)}
						{#if run.trace}
							<Trace.Root>
								{#each run.parts as part, index (index)}
									{#if part.type === "reasoning"}
										{@render thinkingTrace(
											part.text,
											live && part.state === "streaming",
											`${message.id}-${runIndex}-${index}`
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
			onclick={() => (nextMessage ? sendMessage(nextMessage) : reset())}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
