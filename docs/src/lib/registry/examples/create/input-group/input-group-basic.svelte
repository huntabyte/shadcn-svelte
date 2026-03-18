<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Basic">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-default-01">Default (No Input Group)</Field.Label>
			<Input placeholder="Placeholder" id="input-default-01" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-group-02">Input Group</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-group-02" placeholder="Placeholder" />
			</InputGroup.Root>
		</Field.Field>
		<Field.Field data-disabled="true">
			<Field.Label for="input-disabled-03">Disabled</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input
					id="input-disabled-03"
					placeholder="This field is disabled"
					disabled
				/>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field data-invalid="true">
			<Field.Label for="input-invalid-04">Invalid</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input
					id="input-invalid-04"
					placeholder="This field is invalid"
					aria-invalid="true"
				/>
			</InputGroup.Root>
		</Field.Field>
	</Field.Group>
</Example>
