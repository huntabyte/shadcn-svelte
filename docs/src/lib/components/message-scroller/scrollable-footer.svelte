<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { useMessageScrollerScrollable } from "$lib/registry/ui/message-scroller/index.js";

	const scrollable = useMessageScrollerScrollable();
	const status = $derived(getScrollStatus({ start: scrollable.start, end: scrollable.end }));

	function getScrollStatus({ start, end }: { start: boolean; end: boolean }) {
		if (start && end) {
			return "You can scroll both ways.";
		}

		if (end) {
			return "You are at the top. You can only scroll down.";
		}

		if (start) {
			return "You are at the bottom. You can only scroll up.";
		}

		return "All messages fit in the viewport.";
	}
</script>

<Card.Footer class="justify-center border-t text-center text-sm text-muted-foreground">
	{status}
</Card.Footer>
