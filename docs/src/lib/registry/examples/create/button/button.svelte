<script lang="ts">
	import ButtonExamples from "./button-examples.svelte";
	import ButtonIconLeft from "./button-icon-left.svelte";
	import ButtonIconOnly from "./button-icon-only.svelte";
	import ButtonIconRight from "./button-icon-right.svelte";
	import ButtonInvalidStates from "./button-invalid-states.svelte";
	import ButtonVariantsAndSizes from "./button-variants-and-sizes.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
	<ButtonVariantsAndSizes />
	<ButtonIconRight />
	<ButtonIconLeft />
	<ButtonIconOnly />
	<ButtonInvalidStates />
	<ButtonExamples />
</ExampleWrapper>
