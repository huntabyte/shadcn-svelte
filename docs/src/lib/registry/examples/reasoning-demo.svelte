<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const script = createChat()
		.user("Why is the checkout deploy so slow?")
		.assistant(({ writer }) => {
			writer.reasoning(
				"The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\n\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.",
				{ delayMs: 40 }
			);
			writer.sleep(400);
			writer.text(
				"Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	// The reader's choice for each reasoning row. Until they click, it follows `running`.
	// The transcript's rows start open, like `defaultOpen` when the chat is idle.
	function transcriptOpen() {
		const open: Record<string, boolean> = {};
		for (const message of transcript) {
			message.parts
				.filter((part) => part.type === "reasoning")
				.forEach((_, index) => (open[`${message.id}-${index}`] = true));
		}
		return open;
	}

	let reasoningOpen = $state<Record<string, boolean>>(transcriptOpen());
</script>

{#snippet reasoningRow(id: string, text: string, running: boolean)}
	{#snippet line()}
		<Trace.Line status={running ? "running" : undefined}>
			<Trace.Title>{running ? "Thinking" : "Thought for 5s"}</Trace.Title>
		</Trace.Line>
	{/snippet}
	{#if text.length === 0}
		{@render line()}
	{:else}
		<Trace.Collapsible
			open={reasoningOpen[id] ?? running}
			onOpenChange={(open) => (reasoningOpen[id] = open)}
		>
			<Trace.CollapsibleTrigger>{@render line()}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">{text}</Trace.CollapsibleContent>
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
			{@const streaming = busy && message === chat.messages.at(-1)}
			{@const reasoning = message.parts.filter((part) => part.type === "reasoning")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if reasoning.length > 0}
						<Trace.Root>
							{#each reasoning as part, index (index)}
								{@render reasoningRow(
									`${message.id}-${index}`,
									part.text,
									streaming && part.state === "streaming"
								)}
							{/each}
						</Trace.Root>
					{/if}
					{#if text}
						<p>{text}</p>
					{/if}
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
				reasoningOpen = {};
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
