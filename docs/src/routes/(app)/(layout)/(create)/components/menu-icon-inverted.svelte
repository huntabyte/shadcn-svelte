<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="128"
	height="128"
	viewBox="0 0 24 24"
	fill="none"
	role="img"
	class={cn("fill-foreground text-foreground size-4", className)}
	{...restProps}
>
	<path
		d="M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z"
		stroke="currentColor"
		stroke-width="2"
	/>
	<path
		d="M8.5 11.5L14.5001 11.5"
		stroke="var(--background)"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M9.5 15H13.5"
		stroke="var(--background)"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M7.5 8H15.5"
		stroke="var(--background)"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
