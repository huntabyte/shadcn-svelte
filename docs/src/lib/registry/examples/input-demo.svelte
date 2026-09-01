<script lang="ts">
	import { Field, FieldLabel, FieldDescription } from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field>
	<FieldLabel for="input-demo-api-key">API Key</FieldLabel>
	<Input id="input-demo-api-key" type="password" placeholder="sk-..." />
	<FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
</Field>
