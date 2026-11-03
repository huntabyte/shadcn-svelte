<script lang="ts">
	import DocsVirtualizer from "./message-scroller-docs-virtualizer.svelte";

	type VirtualizerMessage = { id: string; text: string };

	let { initial }: { initial: VirtualizerMessage[] } = $props();

	// svelte-ignore state_referenced_locally
	let messages = $state(initial);

	export function setMessages(next: VirtualizerMessage[]) {
		messages = next;
	}
</script>

<DocsVirtualizer {messages} />
