<script lang="ts" module>
	import { z } from "zod";

	const addons = [
		{ id: "analytics", title: "Analytics", description: "Advanced analytics and reporting" },
		{ id: "backup", title: "Backup", description: "Automated daily backups" },
		{ id: "support", title: "Priority Support", description: "24/7 premium customer support" },
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

	const billingPeriods = [
		{ label: "Monthly", value: "monthly" },
		{ label: "Yearly", value: "yearly" },
	];
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = createForm(() => ({
		defaultValues: {
			plan: "basic",
			billingPeriod: "monthly",
			addons: [] as string[],
			emailNotifications: false,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
		},
	}));
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Content>
		<form
			id="form-tanstack-complex"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Fieldset of={form} name="plan">
					{#snippet children(field)}
						<Form.Legend>Subscription Plan</Form.Legend>
						<Form.Description>Choose your subscription plan.</Form.Description>
						<RadioGroup.Root bind:value={() => field.state.value, field.handleChange}>
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>
										<Field.Field
											orientation="horizontal"
											data-invalid={props["aria-invalid"] ? true : undefined}
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
											data-invalid={props["aria-invalid"] ? true : undefined}
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
				<Form.Field of={form} name="billingPeriod">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Billing Period</Form.Label>
								<Select.Root
									type="single"
									items={billingPeriods}
									bind:value={() => field.state.value, field.handleChange}
								>
									<Select.Trigger {...props} class="w-full">
										<Select.Value placeholder="Select" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											{#each billingPeriods as period (period.value)}
												<Select.Item value={period.value} label={period.label}>
													{period.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.Description>Choose how often you want to be billed.</Form.Description>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
				<Field.Separator />
				<Form.Fieldset of={form} name="addons" mode="array">
					{#snippet children(field)}
						<Form.Legend>Add-ons</Form.Legend>
						<Form.Description>Select additional features you'd like to include.</Form.Description>
						<Field.Group data-slot="checkbox-group">
							{#each addons as addon (addon.id)}
								<Form.Control>
									{#snippet children({ props })}
										<Field.Field
											orientation="horizontal"
											data-invalid={props["aria-invalid"] ? true : undefined}
										>
											<Checkbox
												{...props}
												value={addon.id}
												checked={field.state.value.includes(addon.id)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.pushValue(addon.id);
													} else {
														const index = field.state.value.indexOf(addon.id);
														if (index > -1) {
															field.removeValue(index);
														}
													}
												}}
											/>
											<Field.Content>
												<Form.Label>{addon.title}</Form.Label>
												<Field.Description>{addon.description}</Field.Description>
											</Field.Content>
										</Field.Field>
									{/snippet}
								</Form.Control>
							{/each}
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
				<Field.Separator />
				<Form.Field of={form} name="emailNotifications" orientation="horizontal">
					{#snippet children(field)}
						<Form.Control>
							{#snippet children({ props })}
								<Field.Content>
									<Form.Label>Email Notifications</Form.Label>
									<Form.Description>Receive email updates about your subscription</Form.Description>
								</Field.Content>
								<Switch {...props} bind:checked={() => field.state.value, field.handleChange} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button type="submit" form="form-tanstack-complex">Save Preferences</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
