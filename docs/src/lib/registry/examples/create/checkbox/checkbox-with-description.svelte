<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With Description">
	<Field.Field orientation="horizontal">
		<Checkbox.Root id="terms-2" checked />
		<Field.Content>
			<Field.Label for="terms-2">Accept terms and conditions</Field.Label>
			<Field.Description>
				By clicking this checkbox, you agree to the terms and conditions.
			</Field.Description>
		</Field.Content>
	</Field.Field>
</Example>
