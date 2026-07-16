<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Group>
	<Field.Field>
		<Field.Label for="fieldgroup-name">Name</Field.Label>
		<Input id="fieldgroup-name" placeholder="Jordan Lee" />
	</Field.Field>
	<Field.Field>
		<Field.Label for="fieldgroup-email">Email</Field.Label>
		<Input id="fieldgroup-email" type="email" placeholder="name@example.com" />
		<Field.Description>We'll send updates to this address.</Field.Description>
	</Field.Field>
	<Field.Field orientation="horizontal">
		<Button type="reset" variant="outline">Reset</Button>
		<Button type="submit">Submit</Button>
	</Field.Field>
</Field.Group>
