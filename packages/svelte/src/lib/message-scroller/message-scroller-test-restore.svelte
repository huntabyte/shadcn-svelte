<script lang="ts">
	import { useMessageScroller } from "./index.js";
	import type { MessageScrollerScrollOptions } from "./types.js";

	let {
		messageId,
		options,
	}: {
		messageId: string;
		options?: MessageScrollerScrollOptions;
	} = $props();

	const { scrollToMessage } = useMessageScroller();

	$effect(() => {
		scrollToMessage(messageId, options);
	});
</script>
