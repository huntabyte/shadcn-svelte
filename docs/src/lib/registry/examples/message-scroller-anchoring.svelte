<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const conversation: TranscriptMessage[] = [
		{ id: "anchor-user-1", role: "user", text: "Why does the latest turn jump out of view?" },
		{
			id: "anchor-assistant-1",
			role: "assistant",
			text: "Choose the item that represents the start of each turn and mark it as the scroll anchor.",
		},
		{ id: "anchor-user-2", role: "user", text: "Can the response be the anchor instead?" },
		{
			id: "anchor-assistant-2",
			role: "assistant",
			text: "Yes. Anchoring is explicit, so either side of the exchange can define the landing point.",
		},
	];

	let anchorRole = $state<"assistant" | "user">("user");
	const messages = $derived(
		conversation.map((message) => ({ ...message, anchor: message.role === anchorRole }))
	);
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Anchoring Turns</Card.Title>
		<Card.Description>Choose which message starts each anchored turn.</Card.Description>
		<Card.Action>
			<Button
				variant="outline"
				size="sm"
				onclick={() => (anchorRole = anchorRole === "user" ? "assistant" : "user")}
			>
				Anchor {anchorRole}
			</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider>
			{#key anchorRole}
				<Transcript {messages} />
			{/key}
		</MessageScroller.Provider>
	</Card.Content>
</Card.Root>
