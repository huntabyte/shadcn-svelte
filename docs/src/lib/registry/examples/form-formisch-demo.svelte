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
	import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { title: "", description: "" },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Bug Report</Card.Title>
		<Card.Description>Help us improve by reporting bugs you encounter.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-demo">
			<Field.Group>
				<Form.Field of={form} path={["title"]}>
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Bug Title</Form.Label>
								<Input
									{...props}
									value={field.input}
									placeholder="Login button not working on mobile"
									autocomplete="off"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
				<Form.Field of={form} path={["description"]}>
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Description</Form.Label>
								<InputGroup.Root>
									<InputGroup.Textarea
										{...props}
										value={field.input}
										placeholder="I'm having an issue with the login button on mobile."
										rows={6}
										class="min-h-24 resize-none"
									/>
									<InputGroup.Addon align="block-end">
										<InputGroup.Text class="tabular-nums">
											{field.input?.length ?? 0}/100 characters
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
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-demo">Submit</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
