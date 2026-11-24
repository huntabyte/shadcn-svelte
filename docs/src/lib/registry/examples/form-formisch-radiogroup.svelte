<script lang="ts" module>
	import * as v from "valibot";

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

	const FormSchema = v.object({
		plan: v.pipe(v.string(), v.nonEmpty("You must select a subscription plan to continue.")),
	});
</script>

<script lang="ts">
	import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { plan: "" },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Subscription Plan</Card.Title>
		<Card.Description>See pricing and features for each plan.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-radiogroup">
			<Field.Group>
				<Form.Fieldset of={form} path={["plan"]}>
					{#snippet children(field)}
						<Field.Legend>Plan</Field.Legend>
						<Field.Description
							>You can upgrade or downgrade your plan at any time.</Field.Description
						>
						<RadioGroup.Root
							value={field.input ?? ""}
							onValueChange={(value) => field.onInput(value)}
						>
							{#each plans as plan (plan.id)}
								<Form.Control custom>
									{#snippet children({ props })}
										<Form.Label>
											<Field.Field
												orientation="horizontal"
												data-invalid={field.errors ? true : undefined}
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
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-radiogroup">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
