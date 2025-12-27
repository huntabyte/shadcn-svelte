<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With FieldSet">
	<Field.Set>
		<Field.Legend>Battery Level</Field.Legend>
		<Field.Description>Choose your preferred battery level.</Field.Description>
		<RadioGroup.Root value="medium">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="high" id="battery-high" />
				<Field.Label for="battery-high" class="font-normal">High</Field.Label>
			</Field.Field>
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="medium" id="battery-medium" />
				<Field.Label for="battery-medium" class="font-normal">Medium</Field.Label>
			</Field.Field>
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="low" id="battery-low" />
				<Field.Label for="battery-low" class="font-normal">Low</Field.Label>
			</Field.Field>
		</RadioGroup.Root>
	</Field.Set>
</Example>
