<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field>
	<Field.Label for="input-badge">
		Webhook URL
		<Badge variant="secondary" class="ml-auto">Beta</Badge>
	</Field.Label>
	<Input id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
</Field.Field>
