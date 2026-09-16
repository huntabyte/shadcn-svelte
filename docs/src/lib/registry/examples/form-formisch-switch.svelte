<script lang="ts">
	import * as v from "valibot";
	import { Form, Field as FormischField, reset, createForm } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
	const FormSchema = v.object({
		twoFactor: v.pipe(
			v.boolean(),
			v.check(
				(value) => value === true,
				"It is highly recommended to enable two-factor authentication."
			)
		),
	});
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			twoFactor: false,
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
		<Card.Title>Security Settings</Card.Title>
		<Card.Description>Manage your account security preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-switch" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["twoFactor"]}>
					{#snippet children(field)}
						<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
							<Field.Content>
								<Field.Label for="form-formisch-switch-twoFactor">
									Multi-factor authentication
								</Field.Label>
								<Field.Description>
									Enable multi-factor authentication to secure your account.
								</Field.Description>
								{#if field.errors}
									<Field.Error errors={field.errors.map((message) => ({ message }))} />
								{/if}
							</Field.Content>
							<Switch
								id="form-formisch-switch-twoFactor"
								checked={field.input ?? false}
								onCheckedChange={(checked) => field.onInput(checked)}
								aria-invalid={field.errors !== null}
							/>
						</Field.Field>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-switch">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
