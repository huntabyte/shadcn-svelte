<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With Description">
	<Field.Field>
		<Field.Label for="input-demo-username">Username</Field.Label>
		<Input.Root id="input-demo-username" type="text" placeholder="Enter your username" />
		<Field.Description>
			Choose a unique username for your account.
		</Field.Description>
	</Field.Field>
</Example>

