<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import InfoIcon from "@lucide/svelte/icons/info";
</script>

<Field.Field>
	<Field.Label for="input-group-url">Website URL</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input id="input-group-url" placeholder="example.com" />
		<InputGroup.Addon>
			<InputGroup.Text>https://</InputGroup.Text>
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">
			<InfoIcon />
		</InputGroup.Addon>
	</InputGroup.Root>
</Field.Field>
