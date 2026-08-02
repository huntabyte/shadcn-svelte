<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Disabled">
	<Field.Field>
		<Field.Label for="textarea-demo-disabled">Message</Field.Label>
		<Textarea id="textarea-demo-disabled" placeholder="Type your message here." disabled />
	</Field.Field>
</Example>
