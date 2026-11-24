<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		twoFactor: v.pipe(
			v.boolean(),
			v.value(true, "It is highly recommended to enable two-factor authentication.")
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
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { twoFactor: false },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Security Settings</Card.Title>
		<Card.Description>Manage your account security preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-switch">
			<Field.Group>
				<Form.Field of={form} path={["twoFactor"]} orientation="horizontal">
					{#snippet children(field)}
						<Form.Control custom>
							{#snippet children({ props })}
								<Field.Content>
									<Form.Label>Multi-factor authentication</Form.Label>
									<Form.Description>
										Enable multi-factor authentication to secure your account.
									</Form.Description>
									<Form.FieldErrors />
								</Field.Content>
								<Switch
									{...props}
									checked={field.input ?? false}
									onCheckedChange={(checked) => field.onInput(checked)}
								/>
							{/snippet}
						</Form.Control>
					{/snippet}
				</Form.Field>
			</Field.Group>
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-switch">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
