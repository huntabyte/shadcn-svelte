<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Field.Field orientation="horizontal" class="max-w-sm" data-invalid>
	<Field.Content>
		<Field.Label for="switch-terms">Accept terms and conditions</Field.Label>
		<Field.Description>
			You must accept the terms and conditions to continue.
		</Field.Description>
	</Field.Content>
	<Switch id="switch-terms" aria-invalid />
</Field.Field>
