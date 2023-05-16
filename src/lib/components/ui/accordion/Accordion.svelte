<script lang="ts">
	import { Accordion as AccordionPrimitive, type AccordionRootProps } from "radix-svelte";

	export let value: any = undefined;
	export let type: AccordionRootProps["type"] = "single";
	export let disabled: AccordionRootProps["disabled"] = undefined;
</script>

<AccordionPrimitive.Root bind:value {type} {disabled} {...$$restProps}>
	<slot />
</AccordionPrimitive.Root>
