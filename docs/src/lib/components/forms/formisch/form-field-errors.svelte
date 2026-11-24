<script lang="ts">
	import { FieldError } from "$lib/registry/ui/field/index.js";
	import { getFormFieldState } from "./context.svelte.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		...restProps
	}: Omit<ComponentProps<typeof FieldError>, "errors"> = $props();

	const fieldState = getFormFieldState();
</script>

<FieldError
	bind:ref
	id="{fieldState.id}-error"
	errors={fieldState.field.errors?.map((message) => ({ message }))}
	{...restProps}
/>
