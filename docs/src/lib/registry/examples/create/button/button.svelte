<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ButtonVariantsAndSizes from "./button-variants-and-sizes.svelte";
	import ButtonIconRight from "./button-icon-right.svelte";
	import ButtonIconLeft from "./button-icon-left.svelte";
	import ButtonIconOnly from "./button-icon-only.svelte";
	import ButtonInvalidStates from "./button-invalid-states.svelte";
	import ButtonExamples from "./button-examples.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
	<ButtonVariantsAndSizes />
	<ButtonIconRight />
	<ButtonIconLeft />
	<ButtonIconOnly />
	<ButtonInvalidStates />
	<ButtonExamples />
</ExampleWrapper>
