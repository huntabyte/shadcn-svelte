<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		plan: z.enum(["starter", "pro", "enterprise"], {
			required_error: "You must select a subscription plan to continue.",
		}),
	});
</script>

<script lang="ts">
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

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

	const form = superForm(defaults(zod4(formSchema)), {
		SPA: true,
		validators: zod4(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, errors, enhance } = form;
</script>

<div class="flex gap-8">
	<form method="POST" class="flex-1" use:enhance>
		<Card.Root class="w-full sm:max-w-md">
			<Card.Header>
				<Card.Title>Subscription Plan</Card.Title>
				<Card.Description>See pricing and features for each plan.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Field.Group>
					<Field.Set data-invalid={$errors.plan ? true : undefined}>
						<Field.Legend>Plan</Field.Legend>
						<Field.Description>
							You can upgrade or downgrade your plan at any time.
						</Field.Description>
						<RadioGroup.Root
							bind:value={$formData.plan}
							aria-invalid={$errors.plan ? true : undefined}
						>
							{#each plans as p (p.id)}
								<Field.Label for="radio-group-form-{p.id}">
									<Field.Field
										orientation="horizontal"
										data-invalid={$errors.plan ? true : undefined}
									>
										<Field.Content>
											<Field.Title>{p.title}</Field.Title>
											<Field.Description>{p.description}</Field.Description>
										</Field.Content>
										<RadioGroup.Item
											value={p.id}
											id="radio-group-form-{p.id}"
											aria-invalid={$errors.plan ? true : undefined}
										/>
									</Field.Field>
								</Field.Label>
							{/each}
						</RadioGroup.Root>
						<Field.Error
							errors={(($errors.plan as string[] | undefined) ?? []).map((m) => ({
								message: m,
							}))}
						/>
					</Field.Set>
				</Field.Group>
			</Card.Content>
			<Card.Footer>
				<Field.Field orientation="horizontal">
					<Button type="reset" variant="outline">Reset</Button>
					<Button type="submit">Save</Button>
				</Field.Field>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
