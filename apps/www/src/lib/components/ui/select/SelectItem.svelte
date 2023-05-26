<script lang="ts">
	import type { SelectItemProps } from "radix-svelte";
	import { Check } from "lucide-svelte";
	import { Select as SelectPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: SelectItemProps["value"] = "";
</script>

<SelectPrimitive.Item
	class={cn(
		"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{value}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<SelectPrimitive.ItemIndicator>
			<Check class="h-4 w-4" />
		</SelectPrimitive.ItemIndicator>
	</span>

	<SelectPrimitive.ItemText>
		<slot />
	</SelectPrimitive.ItemText>
</SelectPrimitive.Item>
