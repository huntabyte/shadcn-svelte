<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";

	type $$Props = SVGAttributes<SVGElement>;
</script>

<svg
	stroke-width="1.5"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="h-5 w-5"
	{...$$restProps}
>
	<path
		d="M3 5H11"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M3 12H16"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M3 19H21"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
