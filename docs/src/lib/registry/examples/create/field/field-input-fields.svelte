<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<Example title="Input Fields">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-basic">Basic Input</Field.Label>
			<Input.Root id="input-basic" placeholder="Enter text" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-with-desc">Input with Description</Field.Label>
			<Input.Root id="input-with-desc" placeholder="Enter your username" />
			<Field.Description>Choose a unique username for your account.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-desc-first">Email Address</Field.Label>
			<Field.Description>We'll never share your email with anyone.</Field.Description>
			<Input.Root id="input-desc-first" type="email" placeholder="email@example.com" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-required">
				Required Field <span class="text-destructive">*</span>
			</Field.Label>
			<Input.Root id="input-required" placeholder="This field is required" required />
			<Field.Description>This field must be filled out.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-disabled">Disabled Input</Field.Label>
			<Input.Root id="input-disabled" placeholder="Cannot edit" disabled />
			<Field.Description>This field is currently disabled.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-badge">
				Input with Badge
				<Badge variant="secondary" class="ml-auto">Recommended</Badge>
			</Field.Label>
			<Input.Root id="input-badge" placeholder="Enter value" />
		</Field.Field>
		<Field.Field data-invalid>
			<Field.Label for="input-invalid">Invalid Input</Field.Label>
			<Input.Root id="input-invalid" placeholder="This field has an error" aria-invalid />
			<Field.Description>This field contains validation errors.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled>
			<Field.Label for="input-disabled-field">Disabled Field</Field.Label>
			<Input.Root id="input-disabled-field" placeholder="Cannot edit" disabled />
			<Field.Description>This field is currently disabled.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
