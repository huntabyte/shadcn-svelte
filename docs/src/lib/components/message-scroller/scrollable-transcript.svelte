<script lang="ts">
	import MessageAnimated from "$lib/components/message-animated.svelte";

	const messages = Array.from({ length: 12 }, (_, index) => ({
		id: `scrollable-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text:
			index % 2 === 0
				? `Review scroll checkpoint ${index + 1}.`
				: `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
	})) satisfies Array<{
		id: string;
		role: "user" | "assistant";
		text: string;
	}>;
</script>

{#each messages as message (message.id)}
	<MessageAnimated
		{message}
		scrollAnchor={message.role === "user"}
		userVariant="muted"
		assistantVariant="ghost"
	/>
{/each}
