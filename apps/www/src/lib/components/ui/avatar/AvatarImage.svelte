<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export let src: string | undefined = undefined;
	export let alt: string | undefined = undefined;
	export { className as class };
	const image = ctx.getImage(src);
</script>

<img
	use:melt={$image}
	{alt}
	class={cn("aspect-square h-full w-full", className)}
	{...$$restProps}
/>
