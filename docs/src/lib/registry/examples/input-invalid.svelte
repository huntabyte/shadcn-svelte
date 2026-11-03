<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field data-invalid>
	<Field.Label for="input-invalid">Invalid Input</Field.Label>
	<Input id="input-invalid" placeholder="Error" aria-invalid />
	<Field.Description>This field contains validation errors.</Field.Description>
</Field.Field>
