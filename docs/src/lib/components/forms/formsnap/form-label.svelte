<script lang="ts">
	import { Label as FormsnapLabel, type LabelProps } from "formsnap";
	import { FieldLabel } from "$lib/registry/ui/field/index.js";
	import type { WithoutChild } from "$lib/utils.js";

	let { ref = $bindable(null), children, ...restProps }: WithoutChild<LabelProps> = $props();
</script>

<FormsnapLabel bind:ref {...restProps}>
	{#snippet child({ props })}
		<FieldLabel {...props}>
			{@render children?.()}
		</FieldLabel>
	{/snippet}
</FormsnapLabel>
