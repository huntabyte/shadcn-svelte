<script lang="ts">
	import * as ResizablePrimitive from "paneforge";

	let { ...restProps }: ResizablePrimitive.PaneProps = $props();
</script>

<ResizablePrimitive.Pane data-slot="resizable-pane" {...restProps} />
