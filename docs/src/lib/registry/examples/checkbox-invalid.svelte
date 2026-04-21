<script lang="ts">
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Field.Group class="mx-auto w-56">
	<Field.Field orientation="horizontal" data-invalid>
		<Checkbox.Root id="terms-3" aria-invalid />
		<Field.Label for="terms-3">Accept terms and conditions</Field.Label>
	</Field.Field>
</Field.Group>
