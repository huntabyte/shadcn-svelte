<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const overlay = ctx.getOverlay();
</script>

<div
	use:melt={$overlay}
	class={cn(
		"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in",
		className
	)}
	{...$$restProps}
/>
