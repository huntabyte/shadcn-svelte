<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = ContextMenuPrimitive.LabelProps & {
		inset?: boolean;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<ContextMenuPrimitive.Label
	class={cn(
		"px-2 py-1.5 text-sm font-semibold text-foreground",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
>
	<slot />
</ContextMenuPrimitive.Label>
