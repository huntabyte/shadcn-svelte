<script lang="ts">
	import { Legend as FormsnapLegend, type LegendProps } from "formsnap";
	import { FieldLegend } from "$lib/registry/ui/field/index.js";
	import type { WithoutChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		variant,
		children,
		...restProps
	}: WithoutChild<LegendProps> & {
		variant?: ComponentProps<typeof FieldLegend>["variant"];
	} = $props();
</script>

<FormsnapLegend bind:ref {...restProps}>
	{#snippet child({ props })}
		<FieldLegend {variant} {...props}>
			{@render children?.()}
		</FieldLegend>
	{/snippet}
</FormsnapLegend>
