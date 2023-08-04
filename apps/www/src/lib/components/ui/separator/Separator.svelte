<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt, type SeparatorProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let orientation: SeparatorProps["orientation"] = "horizontal";
	export let decorative: SeparatorProps["decorative"] = true;

	const separator = ctx.get({ orientation, decorative });
</script>

<div
	use:melt={$separator}
	class={cn(
		"shrink-0 bg-border",
		orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
		className
	)}
	{...$$restProps}
/>
