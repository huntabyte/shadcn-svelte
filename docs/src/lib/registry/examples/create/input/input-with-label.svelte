<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="With Label">
	<Field.Field>
		<Field.Label for="input-demo-email">Email</Field.Label>
		<Input.Root id="input-demo-email" type="email" placeholder="name@example.com" />
	</Field.Field>
</Example>
