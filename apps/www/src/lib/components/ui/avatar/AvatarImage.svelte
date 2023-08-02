<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export let src: string | undefined = undefined;
	export let alt: string | undefined = undefined;
	export { className as class };
</script>

<img
	{alt}
	{src}
	class={cn("aspect-square h-full w-full", className)}
	{...$$restProps}
/>
