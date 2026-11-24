<script lang="ts">
	import { FieldErrors as FormsnapFieldErrors, type FieldErrorsProps } from "formsnap";
	import { FieldError } from "$lib/registry/ui/field/index.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";

	let { ref = $bindable(null), ...restProps }: WithoutChildrenOrChild<FieldErrorsProps> = $props();
</script>

<FormsnapFieldErrors bind:ref {...restProps}>
	{#snippet child({ props, errors })}
		<FieldError {...props} errors={errors.map((message) => ({ message }))} />
	{/snippet}
</FormsnapFieldErrors>
