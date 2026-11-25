<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Fieldset as FormsnapFieldset, type FieldsetProps } from "formsnap";
	import { FieldSet } from "$lib/registry/ui/field/index.js";
	import type { WithoutChild } from "$lib/utils.js";
	import type { FormPath } from "sveltekit-superforms";

	let {
		ref = $bindable(null),
		form,
		name,
		children: childrenProp,
		...restProps
	}: WithoutChild<FieldsetProps<T, U>> = $props();
</script>

<FormsnapFieldset bind:ref {form} {name} {...restProps}>
	{#snippet child({ props, constraints, errors, tainted, value })}
		<FieldSet {...props}>
			{@render childrenProp?.({ constraints, errors, tainted, value })}
		</FieldSet>
	{/snippet}
</FormsnapFieldset>
