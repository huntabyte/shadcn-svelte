<script lang="ts">
	import { FieldDescription } from "$lib/registry/ui/field/index.js";
	import { FormDescriptionState } from "./context.svelte.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: ComponentProps<typeof FieldDescription> = $props();

	const description = FormDescriptionState.create();
</script>

<FieldDescription bind:ref id={description.id} {...restProps}>
	{@render children?.()}
</FieldDescription>
