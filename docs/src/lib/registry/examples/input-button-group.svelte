<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field>
	<Field.Label for="input-button-group">Search</Field.Label>
	<ButtonGroup.Root>
		<Input id="input-button-group" placeholder="Type to search..." />
		<Button variant="outline">Search</Button>
	</ButtonGroup.Root>
</Field.Field>
