<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
</script>

<Field.Field class="max-w-sm">
	<Field.Label for="inline-start-input">Input</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input id="inline-start-input" placeholder="Search..." />
		<InputGroup.Addon align="inline-start">
			<SearchIcon class="text-muted-foreground" />
		</InputGroup.Addon>
	</InputGroup.Root>
	<Field.Description>Icon positioned at the start.</Field.Description>
</Field.Field>
