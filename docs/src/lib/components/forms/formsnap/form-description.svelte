<script lang="ts">
	import { Description as FormsnapDescription, type DescriptionProps } from "formsnap";
	import { FieldDescription } from "$lib/registry/ui/field/index.js";
	import type { WithoutChild } from "$lib/utils.js";

	let { ref = $bindable(null), children, ...restProps }: WithoutChild<DescriptionProps> = $props();
</script>

<FormsnapDescription bind:ref {...restProps}>
	{#snippet child({ props })}
		<FieldDescription {...props}>
			{@render children?.()}
		</FieldDescription>
	{/snippet}
</FormsnapDescription>
