<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<SVGElement>;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...$$restProps}>
	<rect width="256" height="256" fill="none" />
	<line
		x1="208"
		y1="128"
		x2="128"
		y2="208"
		fill="none"
		stroke="#EB4F27"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="16"
	/>
	<line
		x1="192"
		y1="40"
		x2="40"
		y2="192"
		fill="none"
		stroke="#EB4F27"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="16"
	/>
</svg>
