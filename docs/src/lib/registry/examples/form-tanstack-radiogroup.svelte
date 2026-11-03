<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
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
	] as const;
	const formSchema = z.object({
		plan: z.string().min(1, "You must select a subscription plan to continue."),
	});
	const form = createForm(() => ({
		defaultValues: {
			plan: "",
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
		<Card.Title>Subscription Plan</Card.Title>
		<Card.Description>See pricing and features for each plan.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			novalidate
			id="form-tanstack-radiogroup"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="plan">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Set>
							<Field.Legend>Plan</Field.Legend>
							<Field.Description>
								You can upgrade or downgrade your plan at any time.
							</Field.Description>
							<RadioGroup.Root
								name={field.name}
								value={field.value}
								onValueChange={field.handleChange}
							>
								{#each plans as plan (plan.id)}
									<Field.Label for={`form-tanstack-radiogroup-${plan.id}`}>
										<Field.Field orientation="horizontal" data-invalid={isInvalid}>
											<Field.Content>
												<Field.Title>
													{plan.title}
												</Field.Title>
												<Field.Description>
													{plan.description}
												</Field.Description>
											</Field.Content>
											<RadioGroup.Item
												value={plan.id}
												id={`form-tanstack-radiogroup-${plan.id}`}
												aria-invalid={isInvalid}
											/>
										</Field.Field>
									</Field.Label>
								{/each}
							</RadioGroup.Root>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Set>
					{/snippet}
				</form.Field>
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
