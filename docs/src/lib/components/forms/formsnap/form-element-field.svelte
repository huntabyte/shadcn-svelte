<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>">
	import { ElementField as FormsnapElementField, type ElementFieldProps } from "formsnap";
	import { Field } from "$lib/registry/ui/field/index.js";
	import type { WithoutChildren } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import type { FormPathLeaves } from "sveltekit-superforms";

	let {
		ref = $bindable(null),
		form,
		name,
		children: childrenProp,
		...restProps
	}: ElementFieldProps<T, U> & WithoutChildren<ComponentProps<typeof Field>> = $props();
</script>

<FormsnapElementField {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<Field bind:ref data-invalid={errors.length > 0 ? true : undefined} {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</Field>
	{/snippet}
</FormsnapElementField>
