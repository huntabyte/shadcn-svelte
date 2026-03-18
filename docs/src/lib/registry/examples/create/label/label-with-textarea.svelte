<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Example title="With Textarea">
	<Field.Field>
		<Label for="label-demo-message">Message</Label>
		<Textarea id="label-demo-message" placeholder="Message" />
	</Field.Field>
</Example>
