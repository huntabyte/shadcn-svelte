<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;

	const { item, dispatch } = ctx.getItem();
</script>

<div
	use:melt={$item}
	on:m-click={(e) => dispatch("select", e.detail)}
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
