<script lang="ts">
	import EyeOffIcon from "@lucide/svelte/icons/eye-off";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
</script>

<Field.Field class="max-w-sm">
	<Field.Label for="inline-end-input">Input</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input
			id="inline-end-input"
			type="password"
			placeholder="Enter password"
		/>
		<InputGroup.Addon align="inline-end">
			<EyeOffIcon />
		</InputGroup.Addon>
	</InputGroup.Root>
	<Field.Description>Icon positioned at the end.</Field.Description>
</Field.Field>
