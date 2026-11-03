<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIMessage } from "ai";

	type ChatMessage = UIMessage<
		unknown,
		{
			checkpoint: {
				label: string;
			};
		}
	>;

	type CheckpointPart = Extract<ChatMessage["parts"][number], { type: "data-checkpoint" }>;

	const script = createChat<ChatMessage>()
		.user("Rename the button component to action.")
		.assistant(({ writer }) => {
			writer.text("Renamed Button to Action in components/ui/button.tsx.");
			writer.data({
				type: "data-checkpoint",
				id: "rename",
				data: { label: "Button renamed" },
			});
		})
		.user("Update the docs to match.")
		.assistant(({ writer }) => {
			writer.text("Updated the Button page to say Action.");
		});

	const transcript = script.get();
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	function restore(messageId: string) {
		const index = chat.messages.findIndex((message) => message.id === messageId);

		if (index === -1) {
			return;
		}

		chat.messages = chat.messages.slice(0, index + 1);
	}
</script>

<div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
	{#each chat.messages as message, index (message.id)}
		{@const checkpoint = message.parts.find(
			(part): part is CheckpointPart => part.type === "data-checkpoint"
		)}
		{@const canRestore = index < chat.messages.length - 1}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			<Message.Root>
				<Message.Content>
					<p>{getMessageText(message)}</p>
				</Message.Content>
			</Message.Root>
		{/if}
		{#if checkpoint}
			<Marker.Root variant="separator">
				<Marker.Content class="inline-flex items-center gap-2">
					{checkpoint.data.label}
					{#if canRestore}
						<Button
							size="xs"
							variant="outline"
							aria-label="Restore to {checkpoint.data.label}"
							onclick={() => restore(message.id)}
						>
							Restore
						</Button>
					{/if}
				</Marker.Content>
			</Marker.Root>
		{/if}
	{/each}
	{#if !busy && nextMessage}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			onclick={() => void chat.sendMessage(nextMessage)}
		>
			Continue
		</Button>
	{/if}
</div>
