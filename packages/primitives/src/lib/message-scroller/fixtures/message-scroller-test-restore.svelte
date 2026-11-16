<script lang="ts">
	import { watch } from "runed";
	import { useMessageScroller } from "../index.js";
	import type { MessageScrollerScrollOptions } from "../types.js";

	let {
		messageId,
		options,
	}: {
		messageId: string;
		options?: MessageScrollerScrollOptions;
	} = $props();

	const { scrollToMessage } = useMessageScroller();

	watch([() => messageId, () => options], ([messageId, options]) => {
		scrollToMessage(messageId, options);
	});
</script>
