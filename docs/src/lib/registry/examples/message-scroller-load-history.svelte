<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const history: TranscriptMessage[] = Array.from({ length: 12 }, (_, index) => ({
		id: `history-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text: `Historical message ${index + 1}. Prepending earlier items keeps the current reading position stable.`,
	}));
	let visibleCount = $state(5);
	const messages = $derived(history.slice(-visibleCount));
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Load History</Card.Title>
		<Card.Description>Prepend older messages without moving the reader.</Card.Description>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider>
			<Transcript {messages} />
		</MessageScroller.Provider>
	</Card.Content>
	<Card.Footer class="justify-center border-t">
		<Button
			variant="secondary"
			size="sm"
			disabled={visibleCount === history.length}
			onclick={() => (visibleCount = Math.min(history.length, visibleCount + 3))}
		>
			Load earlier messages
		</Button>
	</Card.Footer>
</Card.Root>
