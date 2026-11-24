<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		twoFactor: z.boolean().refine((val) => val === true, {
			message: "It is highly recommended to enable two-factor authentication.",
		}),
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
	import { Switch } from "$lib/registry/ui/switch/index.js";

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
		<Card.Title>Security Settings</Card.Title>
		<Card.Description>Manage your account security preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-switch" method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="twoFactor" orientation="horizontal">
					<Form.Control>
						{#snippet children({ props })}
							<Field.Content>
								<Form.Label>Multi-factor authentication</Form.Label>
								<Form.Description>
									Enable multi-factor authentication to secure your account.
								</Form.Description>
								<Form.FieldErrors />
							</Field.Content>
							<Switch {...props} bind:checked={$formData.twoFactor} />
						{/snippet}
					</Form.Control>
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-switch">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
