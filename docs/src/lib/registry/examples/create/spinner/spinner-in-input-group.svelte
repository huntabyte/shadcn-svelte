<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Example title="In Input Group">
	<Field.Field>
		<Field.Label for="input-group-spinner">Input Group</Field.Label>
		<InputGroup.Root>
			<InputGroup.Input id="input-group-spinner" />
			<InputGroup.Addon>
				<Spinner />
			</InputGroup.Addon>
		</InputGroup.Root>
	</Field.Field>
</Example>
