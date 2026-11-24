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
				<form.Field name="plan">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Set>
							<Field.Legend>Subscription Plan</Field.Legend>
							<Field.Description>Choose your subscription plan.</Field.Description>
							<RadioGroup.Root
								name={field.name}
								value={field.state.value}
								onValueChange={field.handleChange}
							>
								<Field.Label for="form-tanstack-complex-basic">
									<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
										<Field.Content>
											<Field.Title>Basic</Field.Title>
											<Field.Description>For individuals and small teams</Field.Description>
										</Field.Content>
										<RadioGroup.Item
											value="basic"
											id="form-tanstack-complex-basic"
											aria-invalid={isInvalid}
										/>
									</Field.Field>
								</Field.Label>
								<Field.Label for="form-tanstack-complex-pro">
									<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
										<Field.Content>
											<Field.Title>Pro</Field.Title>
											<Field.Description>For businesses with higher demands</Field.Description>
										</Field.Content>
										<RadioGroup.Item
											value="pro"
											id="form-tanstack-complex-pro"
											aria-invalid={isInvalid}
										/>
									</Field.Field>
								</Field.Label>
							</RadioGroup.Root>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Set>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="billingPeriod">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field data-invalid={isInvalid ? true : undefined}>
							<Field.Label for="form-tanstack-complex-billingPeriod">Billing Period</Field.Label>
							<Select.Root
								type="single"
								items={billingPeriods}
								name={field.name}
								value={field.state.value}
								onValueChange={field.handleChange}
							>
								<Select.Trigger
									id="form-tanstack-complex-billingPeriod"
									class="w-full"
									aria-invalid={isInvalid}
									onblur={field.handleBlur}
								>
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
							<Field.Description>Choose how often you want to be billed.</Field.Description>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="addons" mode="array">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Set>
							<Field.Legend>Add-ons</Field.Legend>
							<Field.Description
								>Select additional features you'd like to include.</Field.Description
							>
							<Field.Group data-slot="checkbox-group">
								{#each addons as addon (addon.id)}
									<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
										<Checkbox
											id="form-tanstack-complex-{addon.id}"
											name={field.name}
											aria-invalid={isInvalid}
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
											<Field.Label for="form-tanstack-complex-{addon.id}">
												{addon.title}
											</Field.Label>
											<Field.Description>{addon.description}</Field.Description>
										</Field.Content>
									</Field.Field>
								{/each}
							</Field.Group>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Set>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="emailNotifications">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
							<Field.Content>
								<Field.Label for="form-tanstack-complex-emailNotifications">
									Email Notifications
								</Field.Label>
								<Field.Description>Receive email updates about your subscription</Field.Description>
							</Field.Content>
							<Switch
								id="form-tanstack-complex-emailNotifications"
								name={field.name}
								checked={field.state.value}
								onCheckedChange={field.handleChange}
								aria-invalid={isInvalid}
							/>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button type="submit" form="form-tanstack-complex">Save Preferences</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
