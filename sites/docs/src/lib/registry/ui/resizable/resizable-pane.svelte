<script lang="ts">
	import * as ResizablePanePrimitive from "paneforge";

	let { ref = $bindable(null), ...restProps }: ResizablePanePrimitive.PaneProps = $props();
</script>

<ResizablePanePrimitive.Pane bind:ref data-slot="resizable-pane" {...restProps} />
