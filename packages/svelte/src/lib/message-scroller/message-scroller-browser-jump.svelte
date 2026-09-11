<script lang="ts">
	import { MessageScroller, useMessageScroller } from "./index.js";

	let { messageId }: { messageId: string } = $props();

	const { scrollToMessage } = useMessageScroller();
</script>

<button
	type="button"
	onclick={() => {
		scrollToMessage(messageId, { align: "start", behavior: "auto" });
	}}
>
	Jump to message
</button>
