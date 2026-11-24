<script lang="ts">
	import { FieldLabel } from "$lib/registry/ui/field/index.js";
	import { getFormControlId } from "./context.svelte.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ComponentProps<typeof FieldLabel> = $props();

	const controlId = getFormControlId();
</script>

<FieldLabel bind:ref for={controlId} {...restProps}>
	{@render children?.()}
</FieldLabel>
