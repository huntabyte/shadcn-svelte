<script lang="ts">
	import NativeSelectBasic from "./native-select-basic.svelte";
	import NativeSelectDisabled from "./native-select-disabled.svelte";
	import NativeSelectInvalid from "./native-select-invalid.svelte";
	import NativeSelectSizes from "./native-select-sizes.svelte";
	import NativeSelectWithField from "./native-select-with-field.svelte";
	import NativeSelectWithGroups from "./native-select-with-groups.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<NativeSelectBasic />
	<NativeSelectWithGroups />
	<NativeSelectSizes />
	<NativeSelectWithField />
	<NativeSelectDisabled />
	<NativeSelectInvalid />
</ExampleWrapper>
