<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field>
	<Field.Label for="picture">Picture</Field.Label>
	<Input id="picture" type="file" />
	<Field.Description>Select a picture to upload.</Field.Description>
</Field.Field>
