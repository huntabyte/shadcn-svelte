<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	let participantCount = $state(2);
	const messages = $derived<TranscriptMessage[]>([
		{ id: "group-1", role: "assistant", author: "Maya", text: "The release branch is ready." },
		{ id: "group-2", role: "user", author: "You", text: "I will run the final checks." },
		{
			id: "group-marker",
			role: "marker",
			text: `${participantCount} people are in this conversation`,
			anchor: true,
		},
		{ id: "group-3", role: "assistant", author: "Theo", text: "I can review the output." },
	]);
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Group Chat</Card.Title>
		<Card.Description
			>System events can anchor the next section of a conversation.</Card.Description
		>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider>
			{#key participantCount}
				<Transcript {messages} />
			{/key}
		</MessageScroller.Provider>
	</Card.Content>
	<Card.Footer class="justify-center border-t">
		<Button variant="secondary" size="sm" onclick={() => (participantCount += 1)}>
			Add participant
		</Button>
	</Card.Footer>
</Card.Root>
