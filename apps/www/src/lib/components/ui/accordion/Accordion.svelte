<script lang="ts">
	import * as AccordionPrimitive from "$lib/primitives/accordion";
	type $$Props = AccordionPrimitive.AccordionProps;
</script>

<AccordionPrimitive.Root {...$$restProps}>
	<slot />
</AccordionPrimitive.Root>
