<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";

	let { ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="2"
	viewBox="0 0 24 24"
	role="img"
	color="currentColor"
	{...restProps}
>
	<path stroke="currentColor" d="M14 12a4 4 0 0 0-8 0 8 8 0 1 0 16 0 11.97 11.97 0 0 0-4-8.944" />
	<path stroke="currentColor" d="M10 12a4 4 0 0 0 8 0 8 8 0 1 0-16 0 11.97 11.97 0 0 0 4.063 9" />
</svg>
