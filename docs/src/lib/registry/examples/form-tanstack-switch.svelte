<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		twoFactor: z.boolean().refine((val) => val === true, {
			message: "It is highly recommended to enable two-factor authentication.",
		}),
	});
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = createForm(() => ({
		defaultValues: {
			twoFactor: false,
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
		<Card.Title>Security Settings</Card.Title>
		<Card.Description>Manage your account security preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-switch"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Field of={form} name="twoFactor" orientation="horizontal">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Field.Content>
									<Form.Label>Multi-factor authentication</Form.Label>
									<Form.Description>
										Enable multi-factor authentication to secure your account.
									</Form.Description>
									<Form.FieldErrors />
								</Field.Content>
								<Switch {...props} bind:checked={() => field.state.value, field.handleChange} />
							{/snippet}
						</Form.Control>
					{/snippet}
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-switch">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
