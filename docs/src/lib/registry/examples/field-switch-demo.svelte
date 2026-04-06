<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Field.Field orientation="horizontal">
	<Field.Content>
		<Field.Label for="2fa">Multi-factor authentication</Field.Label>
	</Field.Content>
	<Switch id="2fa" />
</Field.Field>
