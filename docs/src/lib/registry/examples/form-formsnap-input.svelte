<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters.")
			.max(10, "Username must be at most 10 characters.")
			.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
	});
</script>

<script lang="ts">
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Profile Settings</Card.Title>
		<Card.Description>Update your profile information below.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-input" method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input
								{...props}
								bind:value={$formData.username}
								placeholder="shadcn"
								autocomplete="username"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description>
						This is your public display name. Must be between 3 and 10 characters. Must only contain
						letters, numbers, and underscores.
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-input">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
