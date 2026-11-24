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
				<form.Field name="twoFactor">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
							<Field.Content>
								<Field.Label for="form-tanstack-switch-twoFactor">
									Multi-factor authentication
								</Field.Label>
								<Field.Description>
									Enable multi-factor authentication to secure your account.
								</Field.Description>
								{#if isInvalid}
									<Field.Error errors={field.state.meta.errors} />
								{/if}
							</Field.Content>
							<Switch
								id="form-tanstack-switch-twoFactor"
								name={field.name}
								checked={field.state.value}
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
