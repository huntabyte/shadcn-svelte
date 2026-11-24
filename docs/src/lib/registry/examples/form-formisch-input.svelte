<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		username: v.pipe(
			v.string(),
			v.minLength(3, "Username must be at least 3 characters."),
			v.maxLength(10, "Username must be at most 10 characters."),
			v.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores.")
		),
	});
</script>

<script lang="ts">
	import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { username: "" },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Profile Settings</Card.Title>
		<Card.Description>Update your profile information below.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-input">
			<Field.Group>
				<Form.Field of={form} path={["username"]}>
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Username</Form.Label>
								<Input
									{...props}
									value={field.input}
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
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-input">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
