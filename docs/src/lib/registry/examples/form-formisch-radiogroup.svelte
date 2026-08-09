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
	] as const;

	const FormSchema = v.object({
		plan: v.pipe(v.string(), v.minLength(1, "You must select a subscription plan to continue.")),
	});
</script>

<script lang="ts">
	import { createForm, Field as FormischField, Form, reset } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

	const form = createForm({ schema: FormSchema, initialInput: { plan: "" } });
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Subscription Plan</Card.Title>
		<Card.Description>See pricing and features for each plan.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-radiogroup" onsubmit={handleSubmit}>
			<FormischField of={form} path={["plan"]}>
				{#snippet children(field)}
					<Field.Set data-invalid={field.errors !== null}>
						<Field.Legend>Plan</Field.Legend>
						<Field.Description>
							You can upgrade or downgrade your plan at any time.
						</Field.Description>
						<RadioGroup.Root
							value={field.input ?? ""}
							onValueChange={field.onInput}
							aria-invalid={field.errors !== null}
						>
							{#each plans as plan (plan.id)}
								<Field.Label for={`form-formisch-radiogroup-${plan.id}`}>
									<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
										<Field.Content>
											<Field.Title>{plan.title}</Field.Title>
											<Field.Description>{plan.description}</Field.Description>
										</Field.Content>
										<RadioGroup.Item
											value={plan.id}
											id={`form-formisch-radiogroup-${plan.id}`}
											aria-invalid={field.errors !== null}
										/>
									</Field.Field>
								</Field.Label>
							{/each}
						</RadioGroup.Root>
						{#if field.errors}
							<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
						{/if}
					</Field.Set>
				{/snippet}
			</FormischField>
		</Form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-radiogroup">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
