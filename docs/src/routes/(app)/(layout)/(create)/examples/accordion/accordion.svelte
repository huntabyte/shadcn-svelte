<script lang="ts">
    import ExampleWrapper from "../../components/example-wrapper.svelte";
	import AccordionBasic from "./accordion-basic.svelte";
	import AccordionMultiple from "./accordion-multiple.svelte";
	import AccordionWithBorders from "./accordion-with-borders.svelte";
	import AccordionInCard from "./accordion-in-card.svelte";
	import AccordionWithDisabled from "./accordion-with-disabled.svelte";
</script>

<ExampleWrapper class="w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1">
	<AccordionBasic />
	<AccordionMultiple />
	<AccordionWithBorders />
	<AccordionInCard />
	<AccordionWithDisabled />
</ExampleWrapper>
