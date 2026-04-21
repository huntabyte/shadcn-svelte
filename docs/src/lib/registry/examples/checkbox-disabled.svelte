<script lang="ts">
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Field.Group class="mx-auto w-56">
	<Field.Field orientation="horizontal" data-disabled>
		<Checkbox id="toggle-checkbox-disabled" name="toggle-checkbox-disabled" disabled />
		<Field.Label for="toggle-checkbox-disabled">Enable notifications</Field.Label>
	</Field.Field>
</Field.Group>
