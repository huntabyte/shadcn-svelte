<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from "$components/ui/accordion";
</script>

<Accordion class="w-full">
	<AccordionItem value="item-1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>
			Yes. It adheres to the WAI-ARIA design pattern.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>
			Yes. It comes with default styles that matches the other components'
			aesthetic.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-3">
		<AccordionTrigger>Is it animated?</AccordionTrigger>
		<AccordionContent>
			Yes. It's animated by default, but you can disable it if you prefer.
		</AccordionContent>
	</AccordionItem>
</Accordion>
