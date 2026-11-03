<script lang="ts">
	import RadioGroupBasic from "./radio-group-basic.svelte";
	import RadioGroupDisabled from "./radio-group-disabled.svelte";
	import RadioGroupGrid from "./radio-group-grid.svelte";
	import RadioGroupInvalid from "./radio-group-invalid.svelte";
	import RadioGroupWithDescriptions from "./radio-group-with-descriptions.svelte";
	import RadioGroupWithFieldSet from "./radio-group-with-field-set.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<RadioGroupBasic />
	<RadioGroupWithDescriptions />
	<RadioGroupWithFieldSet />
	<RadioGroupGrid />
	<RadioGroupDisabled />
	<RadioGroupInvalid />
</ExampleWrapper>
