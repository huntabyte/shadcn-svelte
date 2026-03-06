<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import CheckboxBasic from "./checkbox-basic.svelte";
	import CheckboxWithDescription from "./checkbox-with-description.svelte";
	import CheckboxInvalid from "./checkbox-invalid.svelte";
	import CheckboxDisabled from "./checkbox-disabled.svelte";
	import CheckboxWithTitle from "./checkbox-with-title.svelte";
	import CheckboxInTable from "./checkbox-in-table.svelte";
	import CheckboxGroup from "./checkbox-group.svelte";
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
