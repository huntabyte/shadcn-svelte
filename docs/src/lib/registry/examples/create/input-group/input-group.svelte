<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import InputGroupBasic from "./input-group-basic.svelte";
	import InputGroupWithAddons from "./input-group-with-addons.svelte";
	import InputGroupWithButtons from "./input-group-with-buttons.svelte";
	import InputGroupWithTooltip from "./input-group-with-tooltip.svelte";
	import InputGroupWithKbd from "./input-group-with-kbd.svelte";
	import InputGroupInCard from "./input-group-in-card.svelte";
	import InputGroupTextareaExamples from "./input-group-textarea-examples.svelte";
</script>

<ExampleWrapper class="min-w-0">
	<InputGroupBasic />
	<InputGroupWithAddons />
	<InputGroupWithButtons />
	<InputGroupWithTooltip />
	<InputGroupWithKbd />
	<InputGroupInCard />
	<InputGroupTextareaExamples />
</ExampleWrapper>
