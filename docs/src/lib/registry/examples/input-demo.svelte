<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field>
	<Field.Label for="input-demo-api-key">API Key</Field.Label>
	<Input id="input-demo-api-key" type="password" placeholder="sk-..." />
	<Field.Description>Your API key is encrypted and stored securely.</Field.Description>
</Field.Field>
