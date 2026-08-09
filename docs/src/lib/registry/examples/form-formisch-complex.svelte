<script lang="ts" module>
	import * as v from "valibot";

	const addons = [
		{ id: "analytics", title: "Analytics", description: "Advanced analytics and reporting" },
		{ id: "backup", title: "Backup", description: "Automated daily backups" },
		{ id: "support", title: "Priority Support", description: "24/7 premium customer support" },
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
				(value) => value.every((addon) => addons.some((item) => item.id === addon)),
				"You selected an invalid add-on"
			)
		),
		emailNotifications: v.boolean(),
	});
</script>

<script lang="ts">
	import { createForm, Field as FormischField, Form, reset } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

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
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header class="border-b">
		<Card.Title>You're almost there!</Card.Title>
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
							<RadioGroup.Root value={field.input ?? ""} onValueChange={field.onInput}>
								{#each [{ id: "basic", title: "Basic", description: "For individuals and small teams" }, { id: "pro", title: "Pro", description: "For businesses with higher demands" }] as plan (plan.id)}
									<Field.Label for={`form-formisch-complex-${plan.id}`}>
										<Field.Field orientation="horizontal">
											<Field.Content>
												<Field.Title>{plan.title}</Field.Title>
												<Field.Description>{plan.description}</Field.Description>
											</Field.Content>
											<RadioGroup.Item value={plan.id} id={`form-formisch-complex-${plan.id}`} />
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
				<Field.Separator />
				<FormischField of={form} path={["billingPeriod"]}>
					{#snippet children(field)}
						<Field.Field data-invalid={field.errors !== null}>
							<Field.Label for="form-formisch-complex-billingPeriod">Billing Period</Field.Label>
							<Select.Root type="single" value={field.input ?? ""} onValueChange={field.onInput}>
								<Select.Trigger
									id="form-formisch-complex-billingPeriod"
									aria-invalid={field.errors !== null}
								>
									{field.input === "monthly"
										? "Monthly"
										: field.input === "yearly"
											? "Yearly (Save 20%)"
											: "Select billing period"}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="monthly" label="Monthly" />
									<Select.Item value="yearly" label="Yearly (Save 20%)" />
								</Select.Content>
							</Select.Root>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Field>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["addons"]}>
					{#snippet children(field)}
						<Field.Set data-invalid={field.errors !== null}>
							<Field.Legend variant="label">Add-ons</Field.Legend>
							<Field.Description>Enhance your plan with optional features.</Field.Description>
							<Field.Group data-slot="checkbox-group">
								{#each addons as addon (addon.id)}
									<Field.Field orientation="horizontal">
										<Checkbox
											id={`form-formisch-complex-${addon.id}`}
											checked={(field.input ?? []).includes(addon.id)}
											onCheckedChange={(checked) => {
												const current = field.input ?? [];
												field.onInput(
													checked
														? [...current, addon.id]
														: current.filter((value: string) => value !== addon.id)
												);
											}}
										/>
										<Field.Content>
											<Field.Label for={`form-formisch-complex-${addon.id}`}>
												{addon.title}
											</Field.Label>
											<Field.Description>{addon.description}</Field.Description>
										</Field.Content>
									</Field.Field>
								{/each}
							</Field.Group>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Set>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["emailNotifications"]}>
					{#snippet children(field)}
						<Field.Field orientation="horizontal">
							<Field.Content>
								<Field.Label for="form-formisch-complex-emailNotifications">
									Email Notifications
								</Field.Label>
								<Field.Description>Receive billing and account updates.</Field.Description>
							</Field.Content>
							<Switch
								id="form-formisch-complex-emailNotifications"
								checked={field.input ?? false}
								onCheckedChange={field.onInput}
							/>
						</Field.Field>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-complex">Complete Setup</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
