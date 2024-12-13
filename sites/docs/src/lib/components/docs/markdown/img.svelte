<script lang="ts">
	import { type PrimitiveImgAttributes, cn } from "$lib/utils.js";

	let { class: className, src, alt, ...restProps }: PrimitiveImgAttributes = $props();
</script>

<img {src} {alt} class={cn("rounded-md", className)} {...restProps} />
