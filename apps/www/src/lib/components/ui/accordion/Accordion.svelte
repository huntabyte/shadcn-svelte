<script lang="ts">
	import { Accordion as AccordionPrimitive } from "@huntabyte/primitives";
	type $$Props = AccordionPrimitive.AccordionProps;
</script>

<AccordionPrimitive.Root {...$$restProps}>
	<slot />
</AccordionPrimitive.Root>
