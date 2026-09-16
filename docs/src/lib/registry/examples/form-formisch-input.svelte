<script lang="ts">
	import * as v from "valibot";
	import { Form, Field as FormischField, reset, createForm } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
	const FormSchema = v.object({
		username: v.pipe(
			v.string(),
			v.minLength(3, "Username must be at least 3 characters."),
			v.maxLength(10, "Username must be at most 10 characters."),
			v.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores.")
		),
	});
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			username: "",
		},
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast("You submitted the following values:", {
			description: FormSubmittedValues,
			componentProps: { value: output },
			position: "bottom-right",
			classes: {
				content: "flex flex-col gap-2",
			},
			style: "--border-radius: calc(var(--radius) + 4px)",
		});
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Profile Settings</Card.Title>
		<Card.Description>Update your profile information below.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-input" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["username"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-input-username">Username</Field.Label>
							<Input
								{...field.props}
								id="form-formisch-input-username"
								value={field.input ?? ""}
								aria-invalid={field.errors !== null}
								placeholder="shadcn"
								autocomplete="username"
							/>
							<Field.Description>
								This is your public display name. Must be between 3 and 10 characters. Must only
								contain letters, numbers, and underscores.
							</Field.Description>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-input">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
