<script lang="ts" module>
	import { z } from "zod";

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
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = createForm(() => ({
		defaultValues: {
			title: "",
			description: "",
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
		<Card.Title>Bug Report</Card.Title>
		<Card.Description>Help us improve by reporting bugs you encounter.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-demo"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Field of={form} name="title">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Bug Title</Form.Label>
								<Input
									{...props}
									bind:value={() => field.state.value, field.handleChange}
									placeholder="Login button not working on mobile"
									autocomplete="off"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
				<Form.Field of={form} name="description">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Description</Form.Label>
								<InputGroup.Root>
									<InputGroup.Textarea
										{...props}
										bind:value={() => field.state.value, field.handleChange}
										placeholder="I'm having an issue with the login button on mobile."
										rows={6}
										class="min-h-24 resize-none"
									/>
									<InputGroup.Addon align="block-end">
										<InputGroup.Text class="tabular-nums">
											{field.state.value.length}/100 characters
										</InputGroup.Text>
									</InputGroup.Addon>
								</InputGroup.Root>
							{/snippet}
						</Form.Control>
						<Form.Description>
							Include steps to reproduce, expected behavior, and what actually happened.
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
			<Button type="submit" form="form-tanstack-demo">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
