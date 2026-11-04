<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		required = false,
		children,
		...restProps
	}: ComponentProps<typeof Label> & {
		/** Shows a red asterisk after the label. Also set required on the control so screen readers announce it. */
		required?: boolean;
	} = $props();
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={cn(
		"cn-field-label group/field-label peer/field-label flex w-fit",
		"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	{#if required}
		<span aria-hidden="true" data-slot="field-required" class="-ml-1 text-destructive">*</span>
	{/if}
</Label>
