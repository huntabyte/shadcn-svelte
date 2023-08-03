<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { content, open } = ctx.getContent();
</script>

{#if $open}
	<div
		use:melt={$content}
		class={cn(
			"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 translate-y-1",
			className
		)}
		{...$$restProps}
	>
		<!-- <SelectPrimitive.Viewport
			class={cn(
				"p-1",
				"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
			)}
		> -->
		<slot />
		<!-- </SelectPrimitive.Viewport> -->
	</div>
{/if}
