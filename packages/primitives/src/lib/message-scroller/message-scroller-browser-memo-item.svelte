<script lang="ts">
	import { MessageScroller } from "./index.js";

	let {
		id,
		anchor,
		height = 80,
	}: {
		id: string;
		anchor: boolean;
		height?: number;
	} = $props();
</script>

<MessageScroller.Item
	messageId={id}
	scrollAnchor={anchor}
	style="height: {height}px; flex: none;"
>
	{id}
</MessageScroller.Item>
