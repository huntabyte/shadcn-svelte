<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLImgAttributes } from "svelte/elements";

	let { class: className, src, alt, height, width, ...restProps }: HTMLImgAttributes = $props();
</script>

<img class={cn("mt-6 rounded-md border", className)} {src} {alt} {height} {width} {...restProps} />
