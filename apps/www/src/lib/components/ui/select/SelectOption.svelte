<script lang="ts">
	import { Check } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { ctx, melt, type SelectOptionProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: SelectOptionProps["value"];
	export let disabled: SelectOptionProps["disabled"] = undefined;
	export let label: SelectOptionProps["label"] = undefined;
	const { option, isSelected } = ctx.getOption();
</script>

<div
	use:melt={$option({ value, disabled, label })}
	class={cn(
		"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		{#if $isSelected(value)}
			<Check class="h-4 w-4" />
		{/if}
	</span>
	<slot>
		{label ? label : value}
	</slot>
</div>
