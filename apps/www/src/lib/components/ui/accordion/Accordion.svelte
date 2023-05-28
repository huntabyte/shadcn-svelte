<script lang="ts">
	import { Accordion as AccordionPrimitive } from "radix-svelte";

	// Remove the any when radix-svelte is updated to properly satisfy the types
	// https://www.radix-svelte.com/docs/accordion
	export let value: any = undefined;
</script>

<AccordionPrimitive.Root bind:value {...$$restProps}>
	<slot />
</AccordionPrimitive.Root>
