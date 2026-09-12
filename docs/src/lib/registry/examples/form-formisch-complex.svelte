<script lang="ts">
	import * as v from "valibot";
	import { Form, Field as FormischField, reset, createForm } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
	const addons = [
		{
			id: "analytics",
			title: "Analytics",
			description: "Advanced analytics and reporting",
		},
		{
			id: "backup",
			title: "Backup",
			description: "Automated daily backups",
		},
		{
			id: "support",
			title: "Priority Support",
			description: "24/7 premium customer support",
		},
	] as const;
	const FormSchema = v.object({
		plan: v.pipe(
			v.string(),
			v.minLength(1, "Please select a subscription plan"),
			v.check(
				(value) => value === "basic" || value === "pro",
				"Invalid plan selection. Please choose Basic or Pro"
			)
		),
		billingPeriod: v.pipe(v.string(), v.minLength(1, "Please select a billing period")),
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
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			plan: "basic",
			billingPeriod: "",
			addons: [],
			emailNotifications: false,
		},
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast("You submitted the following values:", {
			description: FormSubmittedValues,
			componentProps: { value: output },
			position: "bottom-right",
			classes: {
				content: "flex flex-col gap-2",
			},
			style: "--border-radius: calc(var(--radius) + 4px)",
		});
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header class="border-b">
		<Card.Title>You&apos;re almost there!</Card.Title>
		<Card.Description>Choose your subscription plan and billing period.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-complex" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["plan"]}>
					{#snippet children(field)}
						<Field.Set data-invalid={field.errors !== null}>
							<Field.Legend variant="label">Subscription Plan</Field.Legend>
							<Field.Description>Choose your subscription plan.</Field.Description>
							<RadioGroup.Root
								value={field.input ?? ""}
								onValueChange={(value) => field.onInput(value)}
								aria-invalid={field.errors !== null}
							>
								<Field.Label for="form-formisch-complex-basic">
									<Field.Field orientation="horizontal">
										<Field.Content>
											<Field.Title>Basic</Field.Title>
											<Field.Description>For individuals and small teams</Field.Description>
										</Field.Content>
										<RadioGroup.Item value="basic" id="form-formisch-complex-basic" />
									</Field.Field>
								</Field.Label>
								<Field.Label for="form-formisch-complex-pro">
									<Field.Field orientation="horizontal">
										<Field.Content>
											<Field.Title>Pro</Field.Title>
											<Field.Description>For businesses with higher demands</Field.Description>
										</Field.Content>
										<RadioGroup.Item value="pro" id="form-formisch-complex-pro" />
									</Field.Field>
								</Field.Label>
							</RadioGroup.Root>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Set>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["billingPeriod"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-complex-billingPeriod">Billing Period</Field.Label>
							<Select.Root
								value={field.input ?? ""}
								onValueChange={(value) => field.onInput(value)}
								type="single"
							>
								<Select.Trigger
									id="form-formisch-complex-billingPeriod"
									aria-invalid={field.errors !== null}
								>
									{field.input === "monthly"
										? "Monthly"
										: field.input === "yearly"
											? "Yearly"
											: "Select"}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="monthly">Monthly</Select.Item>
									<Select.Item value="yearly">Yearly</Select.Item>
								</Select.Content>
							</Select.Root>
							<Field.Description>Choose how often you want to be billed.</Field.Description>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["addons"]}>
					{#snippet children(field)}
						{@const current = field.input ?? []}
						<Field.Set>
							<Field.Legend>Add-ons</Field.Legend>
							<Field.Description>
								Select additional features you&apos;d like to include.
							</Field.Description>
							<Field.Group data-slot="checkbox-group">
								{#each addons as addon (addon.id)}
									<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
										<Checkbox
											id={`form-formisch-complex-${addon.id}`}
											aria-invalid={field.errors !== null}
											checked={current.includes(addon.id)}
											onCheckedChange={(checked) => {
												field.onInput(
													checked === true
														? [...current, addon.id]
														: current.filter((value) => value !== addon.id)
												);
											}}
										/>
										<Field.Content>
											<Field.Label for={`form-formisch-complex-${addon.id}`}>
												{addon.title}
											</Field.Label>
											<Field.Description>
												{addon.description}
											</Field.Description>
										</Field.Content>
									</Field.Field>
								{/each}
							</Field.Group>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Set>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["emailNotifications"]}>
					{#snippet children(field)}
						<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
							<Field.Content>
								<Field.Label for="form-formisch-complex-emailNotifications">
									Email Notifications
								</Field.Label>
								<Field.Description>Receive email updates about your subscription</Field.Description>
							</Field.Content>
							<Switch
								id="form-formisch-complex-emailNotifications"
								checked={field.input ?? false}
								onCheckedChange={(checked) => field.onInput(checked)}
								aria-invalid={field.errors !== null}
							/>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field>
			<Button type="submit" form="form-formisch-complex">Save Preferences</Button>
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
