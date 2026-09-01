<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field data-disabled>
	<Field.Label for="input-demo-disabled">Email</Field.Label>
	<Input id="input-demo-disabled" type="email" placeholder="Email" disabled />
	<Field.Description>This field is currently disabled.</Field.Description>
</Field.Field>
