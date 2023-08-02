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
			"z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90 mt-3",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</div>
{/if}
