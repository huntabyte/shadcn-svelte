<script lang="ts">
	import { FieldDescription } from "$lib/registry/ui/field/index.js";
	import { getFormFieldState } from "./context.svelte.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ComponentProps<typeof FieldDescription> = $props();

	const fieldState = getFormFieldState();
</script>

<FieldDescription
	bind:ref
	id="{fieldState.id}-description"
	{@attach () => {
		fieldState.hasDescription = true;
		return () => (fieldState.hasDescription = false);
	}}
	{...restProps}
>
	{@render children?.()}
</FieldDescription>
