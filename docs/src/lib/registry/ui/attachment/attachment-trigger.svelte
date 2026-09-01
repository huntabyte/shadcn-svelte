<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, type = "button", ...restProps }: WithElementRef<
		HTMLButtonAttributes
	> = $props();
</script>

<button bind:this={ref} data-slot="attachment-trigger" {type} class={cn("absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...restProps}></button>
