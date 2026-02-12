<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Invalid">
	<Field.Field orientation="horizontal" data-invalid>
		<Checkbox.Root id="terms-3" aria-invalid />
		<Field.Label for="terms-3">Accept terms and conditions</Field.Label>
	</Field.Field>
</Example>
