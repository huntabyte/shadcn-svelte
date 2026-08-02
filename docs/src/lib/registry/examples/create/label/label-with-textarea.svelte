<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="With Textarea">
	<Field.Field>
		<Label for="label-demo-message">Message</Label>
		<Textarea id="label-demo-message" placeholder="Message" />
	</Field.Field>
</Example>
