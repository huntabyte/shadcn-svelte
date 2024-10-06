<script lang="ts" module>
	import type { FormPathLeaves as _FormPathLeaves } from "sveltekit-superforms";
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends _FormPathLeaves<T>">
	import * as FormPrimitive from "formsnap";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children: childrenProp,
		...restProps
	}: FormPrimitive.ElementFieldProps<T, U> & PrimitiveDivAttributes = $props();
</script>

<FormPrimitive.ElementField {form} {name}>
	{#snippet children({ constraints, errors, tainted, value })}
		<div bind:this={ref} class={cn("space-y-2", className)} {...restProps}>
			{@render childrenProp?.({ constraints, errors, tainted, value: value as T[U] })}
		</div>
	{/snippet}
</FormPrimitive.ElementField>
