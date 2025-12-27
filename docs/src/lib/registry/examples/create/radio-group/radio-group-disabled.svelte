<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Disabled">
	<RadioGroup.Root value="option2" disabled>
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="option1" id="disabled-1" />
			<Field.Label for="disabled-1" class="font-normal">Option 1</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="option2" id="disabled-2" />
			<Field.Label for="disabled-2" class="font-normal">Option 2</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="option3" id="disabled-3" />
			<Field.Label for="disabled-3" class="font-normal">Option 3</Field.Label>
		</Field.Field>
	</RadioGroup.Root>
</Example>
