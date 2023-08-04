<script lang="ts">
	import { cn } from "$lib/utils";
	import { Circle } from "lucide-svelte";
	import { ctx, melt, type MenubarRadioItemProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: MenubarRadioItemProps["value"];
	export let disabled: MenubarRadioItemProps["disabled"] = false;

	const { radioItem, isChecked } = ctx.getRadioItem();
</script>

<div
	use:melt={$radioItem({ value, disabled })}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		{#if $isChecked(value)}
			<Circle class="h-2 w-2 fill-current" />
		{/if}
	</span>
	<slot />
</div>
