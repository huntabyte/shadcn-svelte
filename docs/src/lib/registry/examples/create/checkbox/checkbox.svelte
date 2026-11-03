<script lang="ts">
	import CheckboxBasic from "./checkbox-basic.svelte";
	import CheckboxDisabled from "./checkbox-disabled.svelte";
	import CheckboxGroup from "./checkbox-group.svelte";
	import CheckboxInTable from "./checkbox-in-table.svelte";
	import CheckboxInvalid from "./checkbox-invalid.svelte";
	import CheckboxWithDescription from "./checkbox-with-description.svelte";
	import CheckboxWithTitle from "./checkbox-with-title.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<CheckboxBasic />
	<CheckboxWithDescription />
	<CheckboxInvalid />
	<CheckboxDisabled />
	<CheckboxWithTitle />
	<CheckboxInTable />
	<CheckboxGroup />
</ExampleWrapper>
