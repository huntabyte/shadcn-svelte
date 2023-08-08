<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { DotFilled } from "radix-icons-svelte";

	type $$Props = ContextMenuPrimitive.RadioItemProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: ContextMenuPrimitive.RadioItemProps["value"];
</script>

<ContextMenuPrimitive.RadioItem
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{value}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<ContextMenuPrimitive.RadioItemIndicator>
			<DotFilled class="h-4 w-4 fill-current" />
		</ContextMenuPrimitive.RadioItemIndicator>
	</span>
	<slot />
</ContextMenuPrimitive.RadioItem>
