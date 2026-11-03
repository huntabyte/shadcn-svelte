<script lang="ts">
	import LabelDisabled from "./label-disabled.svelte";
	import LabelWithCheckbox from "./label-with-checkbox.svelte";
	import LabelWithInput from "./label-with-input.svelte";
	import LabelWithTextarea from "./label-with-textarea.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<LabelWithCheckbox />
	<LabelWithInput />
	<LabelDisabled />
	<LabelWithTextarea />
</ExampleWrapper>
