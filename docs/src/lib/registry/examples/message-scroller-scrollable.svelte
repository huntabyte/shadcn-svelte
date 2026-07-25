<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import ScrollableStatus from "./message-scroller/scrollable-status.svelte";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const messages: TranscriptMessage[] = Array.from({ length: 12 }, (_, index) => ({
		id: `scrollable-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text: `Checkpoint ${index + 1}. Scroll state updates as the viewport moves.`,
	}));
</script>

<MessageScroller.Provider defaultScrollPosition="start">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0 overflow-hidden">
		<Card.Header class="border-b">
			<Card.Title>Scroll Status</Card.Title>
			<Card.Description>Read whether more content exists above or below.</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			<Transcript {messages} />
		</Card.Content>
		<Card.Footer class="justify-center border-t">
			<ScrollableStatus />
		</Card.Footer>
	</Card.Root>
</MessageScroller.Provider>
