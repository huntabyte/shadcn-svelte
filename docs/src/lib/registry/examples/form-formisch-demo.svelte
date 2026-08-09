<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		title: v.pipe(
			v.string(),
			v.minLength(5, "Bug title must be at least 5 characters."),
			v.maxLength(32, "Bug title must be at most 32 characters.")
		),
		description: v.pipe(
			v.string(),
			v.minLength(20, "Description must be at least 20 characters."),
			v.maxLength(100, "Description must be at most 100 characters.")
		),
	});
</script>

<script lang="ts">
	import { createForm, Field as FormischField, Form, reset } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

	const form = createForm({
		schema: FormSchema,
		initialInput: { title: "", description: "" },
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Report a Bug</Card.Title>
		<Card.Description>Help us improve by reporting the issue you found.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-demo" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["title"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-demo-title">Bug Title</Field.Label>
							<Input
								{...field.props}
								id="form-formisch-demo-title"
								value={field.input ?? ""}
								aria-invalid={field.errors !== null}
								placeholder="Login button not working on mobile"
								autocomplete="off"
							/>
							<Field.Description>Provide a concise title for your bug report.</Field.Description>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
				<FormischField of={form} path={["description"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-demo-description">Description</Field.Label>
							<Textarea
								{...field.props}
								id="form-formisch-demo-description"
								value={field.input ?? ""}
								aria-invalid={field.errors !== null}
								placeholder="I'm having an issue with the login button on mobile."
								class="min-h-[120px]"
							/>
							<Field.Description>
								Include the steps to reproduce the issue and what you expected to happen.
							</Field.Description>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-demo">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
