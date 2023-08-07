<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<DropdownMenuPrimitive.Item
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
>
	<slot />
</DropdownMenuPrimitive.Item>
