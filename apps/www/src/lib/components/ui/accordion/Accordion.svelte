<script lang="ts">
	import * as Accordion from "$lib/primitives/accordion";
	type $$Props = Accordion.AccordionProps;
</script>

<Accordion.Root {...$$restProps}>
	<slot />
</Accordion.Root>
