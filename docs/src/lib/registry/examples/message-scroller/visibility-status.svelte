<script lang="ts">
	import { useMessageScrollerVisibility } from "$lib/registry/ui/message-scroller/index.js";

	const visibility = useMessageScrollerVisibility();
</script>

<div class="text-muted-foreground text-center text-sm" aria-live="polite">
	Current anchor: {visibility.currentAnchorId ?? "none"} · Visible: {visibility.visibleMessageIds
		.length}
</div>
