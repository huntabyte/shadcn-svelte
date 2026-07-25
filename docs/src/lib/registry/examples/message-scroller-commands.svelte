<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import CommandMenu from "./message-scroller/command-menu.svelte";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const messages: TranscriptMessage[] = Array.from({ length: 8 }, (_, index) => ({
		id: `command-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text: `Conversation turn ${index + 1}. Commands can jump to any registered message.`,
	}));
	const messageIds = messages
		.filter((message) => message.role === "user")
		.map((message) => message.id);
</script>

<MessageScroller.Provider defaultScrollPosition="end">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="border-b">
			<Card.Title>Commands</Card.Title>
			<Card.Description>Jump to the start, end, or a registered message.</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			<Transcript {messages} />
		</Card.Content>
		<Card.Footer class="justify-center border-t">
			<CommandMenu {messageIds} />
		</Card.Footer>
	</Card.Root>
</MessageScroller.Provider>
