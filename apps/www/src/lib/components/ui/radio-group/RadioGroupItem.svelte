<script lang="ts">
	import { Circle } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { ctx, melt, type RadioGroupItemProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: RadioGroupItemProps["value"];
	export let disabled: RadioGroupItemProps["disabled"] = undefined;

	const { item, isChecked } = ctx.getItem();
</script>

<button
	use:melt={$item({ value, disabled })}
	class={cn(
		"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...$$restProps}
>
	<div class="flex items-center justify-center">
		{#if $isChecked(value)}
			<Circle class="h-2.5 w-2.5 fill-current text-current" />
		{/if}
	</div>
</button>
