<script lang="ts">
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";
	import { melt, ctx, type MenubarCheckboxItemProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let checked: MenubarCheckboxItemProps["checked"] = undefined;
	export let disabled: MenubarCheckboxItemProps["disabled"] = undefined;
	export let defaultChecked: MenubarCheckboxItemProps["defaultChecked"] =
		undefined;
	export let onCheckedChange: MenubarCheckboxItemProps["onCheckedChange"] =
		undefined;

	const { checkboxItem, isChecked } = ctx.getCheckboxItem({
		checked,
		disabled,
		defaultChecked,
		onCheckedChange
	});
</script>

<div
	use:melt={$checkboxItem}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		{#if $isChecked}
			<Check class="h-4 w-4" />
		{/if}
	</span>
	<slot />
</div>
