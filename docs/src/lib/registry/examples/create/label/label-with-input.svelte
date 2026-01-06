<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Example title="With Input">
	<Field.Field>
		<Label for="label-demo-username">Username</Label>
		<Input id="label-demo-username" placeholder="Username" />
	</Field.Field>
</Example>
