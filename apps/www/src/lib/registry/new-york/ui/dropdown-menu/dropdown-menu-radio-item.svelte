<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { DotFilled } from "radix-icons-svelte";

	type $$Props = DropdownMenuPrimitive.RadioItemProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: DropdownMenuPrimitive.RadioItemProps["value"];
</script>

<DropdownMenuPrimitive.RadioItem
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{value}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<DropdownMenuPrimitive.RadioItemIndicator>
			<DotFilled class="h-4 w-4 fill-current" />
		</DropdownMenuPrimitive.RadioItemIndicator>
	</span>
	<slot />
</DropdownMenuPrimitive.RadioItem>
