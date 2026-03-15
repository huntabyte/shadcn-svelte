<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Basic">
	<RadioGroup.Root value="comfortable">
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="default" id="r1" />
			<Field.Label for="r1" class="font-normal">Default</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="comfortable" id="r2" />
			<Field.Label for="r2" class="font-normal">Comfortable</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<RadioGroup.Item value="compact" id="r3" />
			<Field.Label for="r3" class="font-normal">Compact</Field.Label>
		</Field.Field>
	</RadioGroup.Root>
</Example>
