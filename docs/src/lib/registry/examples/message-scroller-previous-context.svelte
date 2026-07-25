<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const messages: TranscriptMessage[] = [
		{ id: "context-1", role: "user", text: "How do I keep streamed replies in view?" },
		{
			id: "context-2",
			role: "assistant",
			text: "Enable autoScroll so the viewport follows the live edge while the reader remains there.",
		},
		{ id: "context-3", role: "user", text: "Will the previous exchange disappear?" },
		{
			id: "context-4",
			role: "assistant",
			text: "No. scrollPreviousItemPeek leaves part of the previous message visible above the new anchor.",
		},
	];
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Keeping Context Visible</Card.Title>
		<Card.Description>New turns retain a visual peek at the previous exchange.</Card.Description
		>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider scrollPreviousItemPeek={96}>
			<Transcript {messages} />
		</MessageScroller.Provider>
	</Card.Content>
</Card.Root>
