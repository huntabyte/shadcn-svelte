<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<Example title="Native Select Fields">
	<Field.Group>
		<Field.Field>
			<Field.Label for="native-select-basic">Basic Native Select</Field.Label>
			<NativeSelect.Root id="native-select-basic">
				<NativeSelect.Option value="">Choose an option</NativeSelect.Option>
				<NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
				<NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
				<NativeSelect.Option value="option3">Option 3</NativeSelect.Option>
			</NativeSelect.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="native-select-country">Country</Field.Label>
			<NativeSelect.Root id="native-select-country">
				<NativeSelect.Option value="">Select your country</NativeSelect.Option>
				<NativeSelect.Option value="us">United States</NativeSelect.Option>
				<NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
				<NativeSelect.Option value="ca">Canada</NativeSelect.Option>
			</NativeSelect.Root>
			<Field.Description>Select the country where you currently reside.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="native-select-timezone">Timezone</Field.Label>
			<Field.Description
				>Choose your local timezone for accurate scheduling.</Field.Description
			>
			<NativeSelect.Root id="native-select-timezone">
				<NativeSelect.Option value="">Select timezone</NativeSelect.Option>
				<NativeSelect.Option value="utc">UTC</NativeSelect.Option>
				<NativeSelect.Option value="est">Eastern Time</NativeSelect.Option>
				<NativeSelect.Option value="pst">Pacific Time</NativeSelect.Option>
			</NativeSelect.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="native-select-grouped">Grouped Options</Field.Label>
			<NativeSelect.Root id="native-select-grouped">
				<NativeSelect.Option value="">Select a region</NativeSelect.Option>
				<NativeSelect.OptGroup label="North America">
					<NativeSelect.Option value="us">United States</NativeSelect.Option>
					<NativeSelect.Option value="ca">Canada</NativeSelect.Option>
					<NativeSelect.Option value="mx">Mexico</NativeSelect.Option>
				</NativeSelect.OptGroup>
				<NativeSelect.OptGroup label="Europe">
					<NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
					<NativeSelect.Option value="fr">France</NativeSelect.Option>
					<NativeSelect.Option value="de">Germany</NativeSelect.Option>
				</NativeSelect.OptGroup>
			</NativeSelect.Root>
			<Field.Description>Native select with grouped options using optgroup.</Field.Description
			>
		</Field.Field>
		<Field.Field data-invalid>
			<Field.Label for="native-select-invalid">Invalid Native Select</Field.Label>
			<NativeSelect.Root id="native-select-invalid" aria-invalid>
				<NativeSelect.Option value="">This field has an error</NativeSelect.Option>
				<NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
				<NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
				<NativeSelect.Option value="option3">Option 3</NativeSelect.Option>
			</NativeSelect.Root>
			<Field.Description>This field contains validation errors.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled>
			<Field.Label for="native-select-disabled-field">Disabled Field</Field.Label>
			<NativeSelect.Root id="native-select-disabled-field" disabled>
				<NativeSelect.Option value="">Cannot select</NativeSelect.Option>
				<NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
				<NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
				<NativeSelect.Option value="option3">Option 3</NativeSelect.Option>
			</NativeSelect.Root>
			<Field.Description>This field is currently disabled.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
