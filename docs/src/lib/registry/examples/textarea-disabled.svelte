<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Field.Field data-disabled>
	<Field.Label for="textarea-disabled">Message</Field.Label>
	<Textarea id="textarea-disabled" placeholder="Type your message here." disabled />
</Field.Field>
