<script lang="ts" module>
	import { z } from "zod";

	const plans = [
		{
			id: "starter",
			title: "Starter (100K tokens/month)",
			description: "For everyday use with basic features.",
		},
		{
			id: "pro",
			title: "Pro (1M tokens/month)",
			description: "For advanced AI usage with more features.",
		},
		{
			id: "enterprise",
			title: "Enterprise (Unlimited tokens)",
			description: "For large teams and heavy usage.",
		},
	];

	const formSchema = z.object({
		plan: z.string().min(1, "You must select a subscription plan to continue."),
	});
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm(() => ({
		defaultValues: {
			plan: "",
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
		<Card.Title>Subscription Plan</Card.Title>
		<Card.Description>See pricing and features for each plan.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-radiogroup"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Fieldset of={form} name="plan">
					{#snippet children(field)}
						<Form.Legend>Plan</Form.Legend>
						<Form.Description>You can upgrade or downgrade your plan at any time.</Form.Description>
						<RadioGroup.Root bind:value={() => field.state.value, field.handleChange}>
							{#each plans as plan (plan.id)}
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>
											<Field.Field
												orientation="horizontal"
												data-invalid={props["aria-invalid"] ? true : undefined}
											>
												<Field.Content>
													<Field.Title>{plan.title}</Field.Title>
													<Field.Description>{plan.description}</Field.Description>
												</Field.Content>
												<RadioGroup.Item {...props} value={plan.id} />
											</Field.Field>
										</Form.Label>
									{/snippet}
								</Form.Control>
							{/each}
						</RadioGroup.Root>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-radiogroup">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
