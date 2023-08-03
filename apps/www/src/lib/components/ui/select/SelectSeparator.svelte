<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };
	const separator = ctx.getSeparator();
</script>

<div
	use:melt={$separator}
	class={cn("-mx-1 my-1 h-px bg-muted", className)}
	{...$$restProps}
/>
