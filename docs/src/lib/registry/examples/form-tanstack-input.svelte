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
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = createForm(() => ({
		defaultValues: {
			username: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Profile Settings</Card.Title>
		<Card.Description>Update your profile information below.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-input"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Field of={form} name="username">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Username</Form.Label>
								<Input
									{...props}
									bind:value={() => field.state.value, field.handleChange}
									placeholder="shadcn"
									autocomplete="username"
								/>
							{/snippet}
						</Form.Control>
						<Form.Description>
							This is your public display name. Must be between 3 and 10 characters. Must only
							contain letters, numbers, and underscores.
						</Form.Description>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-input">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
