<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		about: v.pipe(
			v.string(),
			v.minLength(10, "Please provide at least 10 characters."),
			v.maxLength(200, "Please keep it under 200 characters.")
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
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { about: "" },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Personalization</Card.Title>
		<Card.Description>Customize your experience by telling us more about yourself.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-textarea">
			<Field.Group>
				<Form.Field of={form} path={["about"]}>
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>More about you</Form.Label>
								<Textarea
									{...props}
									value={field.input}
									placeholder="I'm a software engineer..."
									class="min-h-[120px]"
								/>
							{/snippet}
						</Form.Control>
						<Form.Description>
							Tell us more about yourself. This will be used to help us personalize your experience.
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
			<Button type="submit" form="form-formisch-textarea">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
