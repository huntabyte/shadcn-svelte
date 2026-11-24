<script lang="ts">
	import { FieldLabel } from "$lib/registry/ui/field/index.js";
	import { FormControlState } from "./context.svelte.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ComponentProps<typeof FieldLabel> = $props();

	const control = FormControlState.get();
</script>

<FieldLabel bind:ref for={control.id} {...restProps}>
	{@render children?.()}
</FieldLabel>
