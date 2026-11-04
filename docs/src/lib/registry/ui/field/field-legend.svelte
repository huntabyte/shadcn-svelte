<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "legend",
		required = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLLegendElement>> & {
		variant?: "legend" | "label";
		/** Shows a red asterisk after the legend. */
		required?: boolean;
	} = $props();
</script>

<legend
	bind:this={ref}
	data-slot="field-legend"
	data-variant={variant}
	class={cn("cn-field-legend", className)}
	{...restProps}
>
	{@render children?.()}
	{#if required}
		<span aria-hidden="true" data-slot="field-required" class="ml-0.5 text-destructive">*</span>
	{/if}
</legend>
