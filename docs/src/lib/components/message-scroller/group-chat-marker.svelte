<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	let {
		item,
		scrollAnchor = false,
	}: {
		item: {
			id: string;
			type: "event";
			text: string;
			scrollAnchor?: boolean;
		};
		scrollAnchor?: boolean;
	} = $props();
</script>

<MessageScroller.Item {scrollAnchor}>
	<Marker.Root variant="separator">
		<Marker.Content>{item.text}</Marker.Content>
	</Marker.Root>
</MessageScroller.Item>
