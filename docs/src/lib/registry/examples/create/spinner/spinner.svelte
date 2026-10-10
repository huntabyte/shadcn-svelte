<script lang="ts">
	import SpinnerBasic from "./spinner-basic.svelte";
	import SpinnerInBadges from "./spinner-in-badges.svelte";
	import SpinnerInButtons from "./spinner-in-buttons.svelte";
	import SpinnerInEmpty from "./spinner-in-empty.svelte";
	import SpinnerInInputGroup from "./spinner-in-input-group.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<SpinnerBasic />
	<SpinnerInButtons />
	<SpinnerInBadges />
	<SpinnerInInputGroup />
	<SpinnerInEmpty />
</ExampleWrapper>
