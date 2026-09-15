<script lang="ts">
	import { useMessageScrollerVisibility } from "./index.js";

	const visibility = useMessageScrollerVisibility();
</script>

<div
	data-testid="visibility"
	data-current-anchor={visibility.currentAnchorId ?? ""}
	data-visible={visibility.visibleMessageIds.join(",")}
></div>
