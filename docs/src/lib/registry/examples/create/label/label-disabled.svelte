<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Example title="Disabled">
	<Field.Field data-disabled={true}>
		<Label for="label-demo-disabled">Disabled</Label>
		<Input id="label-demo-disabled" placeholder="Disabled" disabled />
	</Field.Field>
</Example>
