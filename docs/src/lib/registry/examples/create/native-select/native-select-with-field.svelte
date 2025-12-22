<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With Field">
	<Field.Field>
		<Field.Label for="native-select-country">Country</Field.Label>
		<NativeSelect.Root id="native-select-country">
			<NativeSelect.Option value="">Select a country</NativeSelect.Option>
			<NativeSelect.Option value="us">United States</NativeSelect.Option>
			<NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
			<NativeSelect.Option value="ca">Canada</NativeSelect.Option>
			<NativeSelect.Option value="au">Australia</NativeSelect.Option>
		</NativeSelect.Root>
		<Field.Description>Select your country of residence.</Field.Description>
	</Field.Field>
</Example>

