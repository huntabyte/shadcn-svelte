<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import type { MessageScrollerDefaultScrollPosition } from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const messages: TranscriptMessage[] = Array.from({ length: 8 }, (_, index) => ({
		id: `opening-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text: `Saved message ${index + 1}. Choose where this transcript opens.`,
	}));
	const positions: MessageScrollerDefaultScrollPosition[] = ["start", "end", "last-anchor"];
	let position = $state<MessageScrollerDefaultScrollPosition>("end");
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Opening Position</Card.Title>
		<Card.Description>Set the initial position for saved conversations.</Card.Description>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		{#key position}
			<MessageScroller.Provider defaultScrollPosition={position}>
				<Transcript {messages} />
			</MessageScroller.Provider>
		{/key}
	</Card.Content>
	<Card.Footer class="flex-wrap justify-center gap-2 border-t">
		{#each positions as option (option)}
			<Button
				variant={position === option ? "default" : "secondary"}
				size="sm"
				onclick={() => (position = option)}
			>
				{option}
			</Button>
		{/each}
	</Card.Footer>
</Card.Root>
