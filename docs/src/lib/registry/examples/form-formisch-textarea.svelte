<script lang="ts">
	import * as v from "valibot";
	import { Form, Field as FormischField, reset, createForm } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
	const FormSchema = v.object({
		about: v.pipe(
			v.string(),
			v.minLength(10, "Please provide at least 10 characters."),
			v.maxLength(200, "Please keep it under 200 characters.")
		),
	});
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			about: "",
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
		<Card.Title>Personalization</Card.Title>
		<Card.Description>
			Customize your experience by telling us more about yourself.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-textarea" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["about"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-textarea-about">More about you</Field.Label>
							<Textarea
								{...field.props}
								id="form-formisch-textarea-about"
								value={field.input ?? ""}
								aria-invalid={field.errors !== null}
								placeholder="I'm a software engineer..."
								class="min-h-[120px]"
							/>
							<Field.Description>
								Tell us more about yourself. This will be used to help us personalize your
								experience.
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
			<Button type="submit" form="form-formisch-textarea">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
