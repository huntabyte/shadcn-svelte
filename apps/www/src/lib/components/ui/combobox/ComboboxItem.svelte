<script lang="ts" generics="T">
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";
	import { ctx, melt, type ComboboxItemProps } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let index: ComboboxItemProps<T>["index"];
	export let item: ComboboxItemProps<T>["item"];
	export let disabled: ComboboxItemProps<T>["disabled"] = undefined;

	const { item: itemEl, isSelected } = ctx.getItem();
</script>

<div
	use:melt={$itemEl({ index, item, disabled })}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
>
	<Check
		class={cn(
			"mr-2 h-4 w-4",
			$isSelected(item) ? "opacity-100" : "opacity-0"
		)}
	/>
	<slot />
</div>
