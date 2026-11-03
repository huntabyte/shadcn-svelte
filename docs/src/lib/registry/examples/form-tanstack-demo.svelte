<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	const formSchema = z.object({
		title: z
			.string()
			.min(5, "Bug title must be at least 5 characters.")
			.max(32, "Bug title must be at most 32 characters."),
		description: z
			.string()
			.min(20, "Description must be at least 20 characters.")
			.max(100, "Description must be at most 100 characters."),
	});
	const form = createForm(() => ({
		defaultValues: {
			title: "",
			description: "",
		},
		validators: [{ run: formSchema, triggers: [] }],
		onSubmit: async ({ value }) => {
			toast("You submitted the following values:", {
				description: FormSubmittedValues,
				componentProps: { value: value },
				position: "bottom-right",
				classes: {
					content: "flex flex-col gap-2",
				},
				style: "--border-radius: calc(var(--radius) + 4px)",
			});
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Bug Report</Card.Title>
		<Card.Description>Help us improve by reporting bugs you encounter.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			novalidate
			id="bug-report-form"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="title">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field data-invalid={isInvalid}>
							<Field.Label for={field.name}>Bug Title</Field.Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.value}
								onblur={field.handleBlur}
								oninput={(e) => field.handleChange(e.currentTarget.value)}
								aria-invalid={isInvalid}
								placeholder="Login button not working on mobile"
								autocomplete="off"
							/>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
				<form.Field name="description">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field data-invalid={isInvalid}>
							<Field.Label for={field.name}>Description</Field.Label>
							<InputGroup.Root>
								<InputGroup.Textarea
									id={field.name}
									name={field.name}
									value={field.value}
									onblur={field.handleBlur}
									oninput={(e) => field.handleChange(e.currentTarget.value)}
									placeholder="I'm having an issue with the login button on mobile."
									rows={6}
									class="min-h-24 resize-none"
									aria-invalid={isInvalid}
								/>
								<InputGroup.Addon align="block-end">
									<InputGroup.Text class="tabular-nums">
										{field.value.length}/100 characters
									</InputGroup.Text>
								</InputGroup.Addon>
							</InputGroup.Root>
							<Field.Description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</Field.Description>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="bug-report-form">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
