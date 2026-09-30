<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="With Checkbox">
	<Field.Field orientation="horizontal">
		<Checkbox id="label-demo-terms" />
		<Label for="label-demo-terms">Accept terms and conditions</Label>
	</Field.Field>
</Example>
