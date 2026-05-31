<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";

	let { ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="128"
	height="128"
	viewBox="0 0 24 24"
	fill="none"
	role="img"
	color="currentColor"
	{...restProps}
>
	<path
		d="M3 12C3 9.79086 4.79086 8 7 8H17C19.2091 8 21 9.79086 21 12C21 14.2091 19.2091 16 17 16H7C4.79086 16 3 14.2091 3 12Z"
		stroke="currentColor"
		stroke-width="2"
		stroke-linejoin="round"
	></path>
</svg>
