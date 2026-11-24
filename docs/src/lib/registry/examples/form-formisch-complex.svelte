<script lang="ts" module>
	import * as v from "valibot";

	const addons = [
		{ id: "analytics", title: "Analytics", description: "Advanced analytics and reporting" },
		{ id: "backup", title: "Backup", description: "Automated daily backups" },
		{ id: "support", title: "Priority Support", description: "24/7 premium customer support" },
	];

	const billingPeriods = [
		{ label: "Monthly", value: "monthly" },
		{ label: "Yearly", value: "yearly" },
	];

	const PlanSchema = v.picklist(["basic", "pro"], "Please select a subscription plan");

	const FormSchema = v.object({
		plan: PlanSchema,
		billingPeriod: v.pipe(v.string(), v.nonEmpty("Please select a billing period")),
		addons: v.pipe(
			v.array(v.string()),
			v.minLength(1, "Please select at least one add-on"),
			v.maxLength(3, "You can select up to 3 add-ons"),
			v.check(
				(value) => value.every((addon) => addons.some((a) => a.id === addon)),
				"You selected an invalid add-on"
			)
		),
		emailNotifications: v.boolean(),
	});
</script>

<script lang="ts">
	import { createForm, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: {
			plan: "basic",
			billingPeriod: "monthly",
			addons: [],
			emailNotifications: false,
		},
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-complex">
			<Field.Group>
				<Form.Fieldset of={form} path={["plan"]}>
					{#snippet children(field)}
						<Field.Legend>Subscription Plan</Field.Legend>
						<Field.Description>Choose your subscription plan.</Field.Description>
						<RadioGroup.Root
							value={field.input ?? ""}
							onValueChange={(value) => {
								if (v.is(PlanSchema, value)) field.onInput(value);
							}}
						>
							<Form.Control custom>
								{#snippet children({ props })}
									<Form.Label>
										<Field.Field
											orientation="horizontal"
											data-invalid={field.errors ? true : undefined}
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
							<Form.Control custom>
								{#snippet children({ props })}
									<Form.Label>
										<Field.Field
											orientation="horizontal"
											data-invalid={field.errors ? true : undefined}
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
				<Form.Field of={form} path={["billingPeriod"]}>
					{#snippet children(field)}
						<Form.Control custom>
							{#snippet children({ props })}
								<Form.Label>Billing Period</Form.Label>
								<Select.Root
									type="single"
									items={billingPeriods}
									value={field.input ?? ""}
									onValueChange={(value) => field.onInput(value)}
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
				<Form.Fieldset of={form} path={["addons"]}>
					{#snippet children(field)}
						<Field.Legend>Add-ons</Field.Legend>
						<Field.Description>Select additional features you'd like to include.</Field.Description>
						<Field.Group data-slot="checkbox-group">
							{#each addons as addon (addon.id)}
								<Field.Field
									orientation="horizontal"
									data-invalid={field.errors ? true : undefined}
								>
									<Form.Control custom>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												value={addon.id}
												checked={field.input?.includes(addon.id)}
												onCheckedChange={(checked) => {
													const current = field.input ?? [];
													field.onInput(
														checked
															? [...current, addon.id]
															: current.filter((item) => item !== addon.id)
													);
												}}
											/>
											<Field.Content>
												<Form.Label>{addon.title}</Form.Label>
												<Field.Description>{addon.description}</Field.Description>
											</Field.Content>
										{/snippet}
									</Form.Control>
								</Field.Field>
							{/each}
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
				<Field.Separator />
				<Form.Field of={form} path={["emailNotifications"]} orientation="horizontal">
					{#snippet children(field)}
						<Form.Control custom>
							{#snippet children({ props })}
								<Field.Content>
									<Form.Label>Email Notifications</Form.Label>
									<Form.Description>Receive email updates about your subscription</Form.Description>
								</Field.Content>
								<Switch
									{...props}
									checked={field.input ?? false}
									onCheckedChange={(checked) => field.onInput(checked)}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					{/snippet}
				</Form.Field>
			</Field.Group>
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button type="submit" form="form-formisch-complex">Save Preferences</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
