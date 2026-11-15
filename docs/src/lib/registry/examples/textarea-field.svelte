<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Field.Field>
	<Field.Label for="textarea-message">Message</Field.Label>
	<Field.Description>Enter your message below.</Field.Description>
	<Textarea id="textarea-message" placeholder="Type your message here." />
</Field.Field>
