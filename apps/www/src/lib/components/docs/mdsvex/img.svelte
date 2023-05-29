<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let src: HTMLImgAttributes["src"] = undefined;
	export let alt: HTMLImgAttributes["alt"] = undefined;
</script>

<img {src} {alt} class={cn("rounded-md", className)} {...$$restProps} />
