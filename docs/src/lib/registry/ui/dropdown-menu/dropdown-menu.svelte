<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";

	let { open = $bindable(false), dir, ...restProps }: DropdownMenuPrimitive.RootProps = $props();
</script>

<DirectionProvider {dir}>
	<DropdownMenuPrimitive.Root bind:open {dir} {...restProps} />
</DirectionProvider>
