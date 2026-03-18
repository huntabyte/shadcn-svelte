<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Example title="With Description">
	<Field.Field>
		<Field.Label for="textarea-demo-message-2">Message</Field.Label>
		<Textarea id="textarea-demo-message-2" placeholder="Type your message here." rows={6} />
		<Field.Description>Type your message and press enter to send.</Field.Description>
	</Field.Field>
</Example>
