<script lang="ts">
	import FieldCheckboxFields from "./field-checkbox-fields.svelte";
	import FieldHorizontalFields from "./field-horizontal-fields.svelte";
	import FieldInputFields from "./field-input-fields.svelte";
	import FieldInputOTPFields from "./field-input-otp-fields.svelte";
	import FieldNativeSelectFields from "./field-native-select-fields.svelte";
	import FieldRadioFields from "./field-radio-fields.svelte";
	import FieldSelectFields from "./field-select-fields.svelte";
	import FieldSliderFields from "./field-slider-fields.svelte";
	import FieldSwitchFields from "./field-switch-fields.svelte";
	import FieldTextareaFields from "./field-textarea-fields.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<FieldInputFields />
	<FieldTextareaFields />
	<FieldSelectFields />
	<FieldCheckboxFields />
	<FieldRadioFields />
	<FieldSwitchFields />
	<FieldSliderFields />
	<FieldNativeSelectFields />
	<FieldInputOTPFields />
	<FieldHorizontalFields />
</ExampleWrapper>
