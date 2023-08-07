<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { Circle } from "lucide-svelte";

	type $$Props = MenubarPrimitive.RadioItemProps;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"];
</script>

<MenubarPrimitive.RadioItem
	{value}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<MenubarPrimitive.RadioItemIndicator>
			<Circle class="h-2 w-2 fill-current" />
		</MenubarPrimitive.RadioItemIndicator>
	</span>
	<slot />
</MenubarPrimitive.RadioItem>
