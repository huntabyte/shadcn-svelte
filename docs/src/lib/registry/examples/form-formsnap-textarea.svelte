<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		about: z
			.string()
			.min(10, "Please provide at least 10 characters.")
			.max(200, "Please keep it under 200 characters."),
	});
</script>

<script lang="ts">
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Personalization</Card.Title>
		<Card.Description>Customize your experience by telling us more about yourself.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-textarea" method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="about">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>More about you</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.about}
								placeholder="I'm a software engineer..."
								class="min-h-[120px]"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description>
						Tell us more about yourself. This will be used to help us personalize your experience.
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-textarea">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
