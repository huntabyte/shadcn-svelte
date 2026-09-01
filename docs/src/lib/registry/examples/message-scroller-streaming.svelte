<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import { onDestroy } from "svelte";
	import Transcript, {
		type TranscriptMessage,
	} from "./message-scroller/example-transcript.svelte";

	const response =
		"MessageScroller follows the live edge while content streams and stops following as soon as the reader scrolls away.";
	let timer: ReturnType<typeof setInterval> | undefined;
	let messages = $state<TranscriptMessage[]>([
		{ id: "stream-user", role: "user", text: "How should streamed responses behave?" },
	]);
	let isStreaming = $state(false);

	function startStreaming() {
		if (isStreaming) return;
		isStreaming = true;
		let wordCount = 0;
		const words = response.split(" ");
		messages = [
			...messages.filter((message) => message.id !== "stream-assistant"),
			{ id: "stream-assistant", role: "assistant", text: "" },
		];
		timer = setInterval(() => {
			wordCount += 1;
			messages = messages.map((message) =>
				message.id === "stream-assistant"
					? { ...message, text: words.slice(0, wordCount).join(" ") }
					: message
			);
			if (wordCount < words.length) return;
			clearInterval(timer);
			timer = undefined;
			isStreaming = false;
		}, 60);
	}

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});
</script>

<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
	<Card.Header class="border-b">
		<Card.Title>Streaming Messages</Card.Title>
		<Card.Description>Follow growing content without overriding reader intent.</Card.Description
		>
	</Card.Header>
	<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
		<MessageScroller.Provider autoScroll>
			<Transcript {messages} />
		</MessageScroller.Provider>
	</Card.Content>
	<Card.Footer class="justify-center border-t">
		<Button variant="secondary" size="sm" onclick={startStreaming} disabled={isStreaming}>
			{isStreaming ? "Streaming…" : "Stream response"}
		</Button>
	</Card.Footer>
</Card.Root>
