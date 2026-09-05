<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	const formSchema = z.object({
		twoFactor: z.boolean().refine((val) => val === true, {
			message: "It is highly recommended to enable two-factor authentication.",
		}),
	});
	const form = createForm(() => ({
		defaultValues: {
			twoFactor: false,
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
		<Card.Title>Security Settings</Card.Title>
		<Card.Description>Manage your account security preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			novalidate
			id="form-tanstack-switch"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="twoFactor">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field orientation="horizontal" data-invalid={isInvalid}>
							<Field.Content>
								<Field.Label for="form-tanstack-switch-twoFactor">
									Multi-factor authentication
								</Field.Label>
								<Field.Description>
									Enable multi-factor authentication to secure your account.
								</Field.Description>
								{#if isInvalid}
									<Field.Error errors={field.meta.errors} />
								{/if}
							</Field.Content>
							<Switch
								id="form-tanstack-switch-twoFactor"
								name={field.name}
								checked={field.value}
								onCheckedChange={field.handleChange}
								aria-invalid={isInvalid}
							/>
						</Field.Field>
					{/snippet}
				</form.Field>
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
