<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";
	import VisibilityStatus from "./message-scroller/visibility-status.svelte";

	const messages: TranscriptMessage[] = Array.from({ length: 10 }, (_, index) => ({
		id: `visibility-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text: `Transcript item ${index + 1}. Visibility updates as this item enters or leaves the viewport.`,
	}));
</script>

<MessageScroller.Provider scrollMargin={12}>
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="border-b">
			<Card.Title>Transcript Outline</Card.Title>
			<Card.Description>Observe the current anchor and visible message IDs.</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			<Transcript {messages} />
		</Card.Content>
		<Card.Footer class="justify-center border-t">
			<VisibilityStatus />
		</Card.Footer>
	</Card.Root>
</MessageScroller.Provider>
