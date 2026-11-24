<script lang="ts" module>
	import { z } from "zod";

	const addons = [
		{ id: "analytics", title: "Analytics", description: "Advanced analytics and reporting" },
		{ id: "backup", title: "Backup", description: "Automated daily backups" },
		{ id: "support", title: "Priority Support", description: "24/7 premium customer support" },
	];

	const billingPeriods = [
		{ label: "Monthly", value: "monthly" },
		{ label: "Yearly", value: "yearly" },
	];

	const formSchema = z.object({
		plan: z
			.string()
			.min(1, "Please select a subscription plan")
			.refine((value) => value === "basic" || value === "pro", {
				message: "Invalid plan selection. Please choose Basic or Pro",
			}),
		billingPeriod: z.string().min(1, "Please select a billing period"),
		addons: z
			.array(z.string())
			.min(1, "Please select at least one add-on")
			.max(3, "You can select up to 3 add-ons")
			.refine((value) => value.every((addon) => addons.some((a) => a.id === addon)), {
				message: "You selected an invalid add-on",
			}),
		emailNotifications: z.boolean(),
	});
</script>

<script lang="ts">
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = superForm(
		defaults(
			{ plan: "basic", billingPeriod: "monthly", addons: [], emailNotifications: false },
			zod4(formSchema)
		),
		{
			validators: zod4(formSchema),
			SPA: true,
			onUpdate: ({ form: f }) => {
				if (f.valid) {
					toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
				} else {
					toast.error("Please fix the errors in the form.");
				}
			},
		}
	);

	const { form: formData, enhance } = form;

	function toggleAddon(id: string, checked: boolean) {
		if (checked) {
			$formData.addons = [...$formData.addons, id];
		} else {
			$formData.addons = $formData.addons.filter((addon) => addon !== id);
		}
	}
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Content>
		<form id="form-formsnap-complex" method="POST" use:enhance>
			<Field.Group>
				<Form.Fieldset {form} name="plan">
					{#snippet children({ errors })}
						<Form.Legend>Subscription Plan</Form.Legend>
						<Form.Description>Choose your subscription plan.</Form.Description>
						<RadioGroup.Root bind:value={$formData.plan} name="plan">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>
										<Field.Field
											orientation="horizontal"
											data-invalid={errors.length > 0 ? true : undefined}
										>
											<Field.Content>
												<Field.Title>Basic</Field.Title>
												<Field.Description>For individuals and small teams</Field.Description>
											</Field.Content>
											<RadioGroup.Item {...props} value="basic" />
										</Field.Field>
									</Form.Label>
								{/snippet}
							</Form.Control>
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>
										<Field.Field
											orientation="horizontal"
											data-invalid={errors.length > 0 ? true : undefined}
										>
											<Field.Content>
												<Field.Title>Pro</Field.Title>
												<Field.Description>For businesses with higher demands</Field.Description>
											</Field.Content>
											<RadioGroup.Item {...props} value="pro" />
										</Field.Field>
									</Form.Label>
								{/snippet}
							</Form.Control>
						</RadioGroup.Root>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
				<Field.Separator />
				<Form.Field {form} name="billingPeriod">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Billing Period</Form.Label>
							<Select.Root
								type="single"
								items={billingPeriods}
								bind:value={$formData.billingPeriod}
								name={props.name}
							>
								<Select.Trigger {...props} class="w-full">
									<Select.Value placeholder="Select" />
								</Select.Trigger>
								<Select.Content>
									{#each billingPeriods as period (period.value)}
										<Select.Item value={period.value} label={period.label}>
											{period.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.Description>Choose how often you want to be billed.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Field.Separator />
				<Form.Fieldset {form} name="addons">
					{#snippet children({ errors })}
						<Form.Legend>Add-ons</Form.Legend>
						<Form.Description>Select additional features you'd like to include.</Form.Description>
						<Field.Group data-slot="checkbox-group">
							{#each addons as addon, i (addon.id)}
								<Form.ElementField
									{form}
									name="addons[{i}]"
									orientation="horizontal"
									data-invalid={errors.length > 0 ? true : undefined}
								>
									<Form.Control>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												aria-invalid={errors.length > 0}
												value={addon.id}
												checked={$formData.addons.includes(addon.id)}
												onCheckedChange={(checked) => toggleAddon(addon.id, checked)}
											/>
											<Field.Content>
												<Form.Label>{addon.title}</Form.Label>
												<Field.Description>{addon.description}</Field.Description>
											</Field.Content>
										{/snippet}
									</Form.Control>
								</Form.ElementField>
							{/each}
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
				<Field.Separator />
				<Form.Field {form} name="emailNotifications" orientation="horizontal">
					<Form.Control>
						{#snippet children({ props })}
							<Field.Content>
								<Form.Label>Email Notifications</Form.Label>
								<Form.Description>Receive email updates about your subscription</Form.Description>
							</Field.Content>
							<Switch {...props} bind:checked={$formData.emailNotifications} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button type="submit" form="form-formsnap-complex">Save Preferences</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
