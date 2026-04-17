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
	<rect x="3" y="3" width="18" height="18" stroke="currentColor" stroke-width="2"></rect>
</svg>
