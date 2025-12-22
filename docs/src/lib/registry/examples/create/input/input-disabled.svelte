<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Disabled">
	<Field.Field>
		<Field.Label for="input-demo-disabled">Email</Field.Label>
		<Input.Root id="input-demo-disabled" type="email" placeholder="Email" disabled />
	</Field.Field>
</Example>

