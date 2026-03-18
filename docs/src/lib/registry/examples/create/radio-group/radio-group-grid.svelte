<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Grid Layout">
	<RadioGroup.Root value="medium" class="grid grid-cols-2 gap-2">
		<Field.Label for="size-small">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="small" id="size-small" />
				<div class="font-medium">Small</div>
			</Field.Field>
		</Field.Label>
		<Field.Label for="size-medium">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="medium" id="size-medium" />
				<div class="font-medium">Medium</div>
			</Field.Field>
		</Field.Label>
		<Field.Label for="size-large">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="large" id="size-large" />
				<div class="font-medium">Large</div>
			</Field.Field>
		</Field.Label>
		<Field.Label for="size-xlarge">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="xlarge" id="size-xlarge" />
				<div class="font-medium">X-Large</div>
			</Field.Field>
		</Field.Label>
	</RadioGroup.Root>
</Example>
