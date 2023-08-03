<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const fallback = ctx.getFallback();
</script>

<div
	use:melt={$fallback}
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full bg-muted",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
