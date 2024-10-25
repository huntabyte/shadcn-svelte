<script lang="ts">
	import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	class={cn("flex size-9 items-center justify-center", className)}
	{...restProps}
>
	<DotsHorizontal class="size-4" />
	<span class="sr-only">More pages</span>
</span>
