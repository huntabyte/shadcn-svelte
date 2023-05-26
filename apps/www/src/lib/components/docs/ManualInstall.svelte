<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from "$components/ui/accordion";
</script>

<Accordion type="single" collapsible>
	<AccordionItem value="manual-installation">
		<AccordionTrigger>Manual Installation</AccordionTrigger>
		<AccordionContent>
			<slot />
		</AccordionContent>
	</AccordionItem>
</Accordion>
