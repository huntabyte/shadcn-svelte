<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = ContextMenuPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ContextMenuPrimitive.Separator
	class={cn("-mx-1 my-1 h-px bg-border", className)}
	{...$$restProps}
/>
