<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { ChevronRight } from "lucide-svelte";

	type $$Props = ContextMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<ContextMenuPrimitive.SubTrigger
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
>
	<slot />
	<ChevronRight class="ml-auto h-4 w-4" />
</ContextMenuPrimitive.SubTrigger>
