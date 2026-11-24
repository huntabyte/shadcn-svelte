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
				<form.Field name="title">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field data-invalid={isInvalid ? true : undefined}>
							<Field.Label for="form-tanstack-demo-title">Bug Title</Field.Label>
							<Input
								id="form-tanstack-demo-title"
								name={field.name}
								value={field.state.value}
								onblur={field.handleBlur}
								oninput={(e) => field.handleChange(e.currentTarget.value)}
								aria-invalid={isInvalid}
								placeholder="Login button not working on mobile"
								autocomplete="off"
							/>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
				<form.Field name="description">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field data-invalid={isInvalid ? true : undefined}>
							<Field.Label for="form-tanstack-demo-description">Description</Field.Label>
							<InputGroup.Root>
								<InputGroup.Textarea
									id="form-tanstack-demo-description"
									name={field.name}
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => field.handleChange(e.currentTarget.value)}
									placeholder="I'm having an issue with the login button on mobile."
									rows={6}
									class="min-h-24 resize-none"
									aria-invalid={isInvalid}
								/>
								<InputGroup.Addon align="block-end">
									<InputGroup.Text class="tabular-nums">
										{field.state.value.length}/100 characters
									</InputGroup.Text>
								</InputGroup.Addon>
							</InputGroup.Root>
							<Field.Description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</Field.Description>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
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
			<Button type="submit" form="form-tanstack-demo">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
