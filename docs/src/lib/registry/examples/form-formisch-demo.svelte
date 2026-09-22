<script lang="ts">
	import * as v from "valibot";
	import { Form, Field as FormischField, reset, createForm } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
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
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			title: "",
			description: "",
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
		<Card.Title>Bug Report</Card.Title>
		<Card.Description>Help us improve by reporting bugs you encounter.</Card.Description>
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
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
				<FormischField of={form} path={["description"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-demo-description">Description</Field.Label>
							<InputGroup.Root>
								<InputGroup.Textarea
									{...field.props}
									id="form-formisch-demo-description"
									value={field.input ?? ""}
									placeholder="I'm having an issue with the login button on mobile."
									rows={6}
									class="min-h-24 resize-none"
									aria-invalid={field.errors !== null}
								/>
								<InputGroup.Addon align="block-end">
									<InputGroup.Text class="tabular-nums">
										{(field.input ?? "").length}/100 characters
									</InputGroup.Text>
								</InputGroup.Addon>
							</InputGroup.Root>
							<Field.Description>
								Include steps to reproduce, expected behavior, and what actually happened.
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
			<Button type="submit" form="form-formisch-demo">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
