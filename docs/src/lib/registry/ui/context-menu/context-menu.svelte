<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";

	let { open = $bindable(false), dir, ...restProps }: ContextMenuPrimitive.RootProps = $props();
</script>

<DirectionProvider {dir}>
	<ContextMenuPrimitive.Root bind:open {dir} {...restProps} />
</DirectionProvider>
