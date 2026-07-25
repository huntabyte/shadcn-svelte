<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	let messages = $state<TranscriptMessage[]>([
		{ id: "animation-1", role: "user", text: "Can message entrances be animated?" },
		{
			id: "animation-2",
			role: "assistant",
			text: "Yes. Apply animation classes to each MessageScroller.Item.",
		},
	]);
	let messageCount = 2;

	function addMessage() {
		messageCount += 1;
		messages = [
			...messages,
			{
				id: `animation-${messageCount}`,
				role: messageCount % 2 === 0 ? "assistant" : "user",
				text: "This item fades and slides into the transcript.",
			},
		];
	}
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Animation</Card.Title>
		<Card.Description>Animate items without changing scroll ownership.</Card.Description>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider>
			<Transcript
				{messages}
				itemClass="animate-in fade-in slide-in-from-bottom-2 duration-300"
			/>
		</MessageScroller.Provider>
	</Card.Content>
	<Card.Footer class="justify-center border-t">
		<Button variant="secondary" size="sm" onclick={addMessage}>Add message</Button>
	</Card.Footer>
</Card.Root>
