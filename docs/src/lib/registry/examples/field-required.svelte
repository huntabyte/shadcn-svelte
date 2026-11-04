<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<div class="w-full max-w-md">
	<Field.Set>
		<Field.Legend>Workspace</Field.Legend>
		<Field.Group>
			<Field.Field>
				<Field.Label for="required-name" required>Name</Field.Label>
				<Input id="required-name" placeholder="Advena Group" required />
			</Field.Field>
			<Field.Field>
				<Field.Label for="required-domain">Domain</Field.Label>
				<Input id="required-domain" placeholder="advenagroup.ca" />
				<Field.Description>Optional.</Field.Description>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</div>
