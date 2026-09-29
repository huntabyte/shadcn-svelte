<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Group class="grid max-w-sm grid-cols-2">
	<Field.Field>
		<Field.Label for="first-name">First Name</Field.Label>
		<Input id="first-name" placeholder="Jordan" />
	</Field.Field>
	<Field.Field>
		<Field.Label for="last-name">Last Name</Field.Label>
		<Input id="last-name" placeholder="Lee" />
	</Field.Field>
</Field.Group>
