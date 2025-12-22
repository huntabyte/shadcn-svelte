<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: ContextMenuPrimitive.RootProps = $props();
</script>

<ContextMenuPrimitive.Root data-slot="context-menu" bind:open {...restProps} />
