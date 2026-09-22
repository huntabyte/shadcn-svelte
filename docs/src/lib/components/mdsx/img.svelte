<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";

	let { class: className, src, alt, ...restProps }: HTMLImgAttributes = $props();
</script>

<img {src} {alt} class={className} {...restProps} />
