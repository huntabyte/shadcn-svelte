<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
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
	const formSchema = z.object({
		plan: z
			.string({
				error: "Please select a subscription plan",
			})
			.min(1, "Please select a subscription plan")
			.refine((value) => value === "basic" || value === "pro", {
				message: "Invalid plan selection. Please choose Basic or Pro",
			}),
		billingPeriod: z
			.string({
				error: "Please select a billing period",
			})
			.min(1, "Please select a billing period"),
		addons: z
			.array(z.string())
			.min(1, "Please select at least one add-on")
			.max(3, "You can select up to 3 add-ons")
			.refine((value) => value.every((addon) => addons.some((a) => a.id === addon)), {
				message: "You selected an invalid add-on",
			}),
		emailNotifications: z.boolean(),
	});
	const form = createForm(() => ({
		defaultValues: {
			plan: "basic",
			billingPeriod: "monthly",
			addons: [] as string[],
			emailNotifications: false,
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

<Card.Root class="w-full max-w-sm">
	<Card.Content>
		<form
			novalidate
			id="subscription-form"
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
							<Field.Legend>Subscription Plan</Field.Legend>
							<Field.Description>Choose your subscription plan.</Field.Description>
							<RadioGroup.Root
								name={field.name}
								value={field.value}
								onValueChange={field.handleChange}
							>
								<Field.Label for="basic">
									<Field.Field orientation="horizontal" data-invalid={isInvalid}>
										<Field.Content>
											<Field.Title>Basic</Field.Title>
											<Field.Description>For individuals and small teams</Field.Description>
										</Field.Content>
										<RadioGroup.Item value="basic" id="basic" aria-invalid={isInvalid} />
									</Field.Field>
								</Field.Label>
								<Field.Label for="pro">
									<Field.Field orientation="horizontal" data-invalid={isInvalid}>
										<Field.Content>
											<Field.Title>Pro</Field.Title>
											<Field.Description>For businesses with higher demands</Field.Description>
										</Field.Content>
										<RadioGroup.Item value="pro" id="pro" aria-invalid={isInvalid} />
									</Field.Field>
								</Field.Label>
							</RadioGroup.Root>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Set>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="billingPeriod">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field data-invalid={isInvalid}>
							<Field.Label for={field.name}>Billing Period</Field.Label>
							<Select.Root
								name={field.name}
								value={field.value}
								onValueChange={field.handleChange}
								type="single"
							>
								<Select.Trigger id={field.name} aria-invalid={isInvalid}>
									{field.value === "monthly"
										? "Monthly"
										: field.value === "yearly"
											? "Yearly"
											: "Select"}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="monthly">Monthly</Select.Item>
									<Select.Item value="yearly">Yearly</Select.Item>
								</Select.Content>
							</Select.Root>
							<Field.Description>Choose how often you want to be billed.</Field.Description>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="addons">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Set>
							<Field.Legend>Add-ons</Field.Legend>
							<Field.Description>
								Select additional features you&apos;d like to include.
							</Field.Description>
							<Field.Group data-slot="checkbox-group">
								{#each addons as addon (addon.id)}
									<Field.Field orientation="horizontal" data-invalid={isInvalid}>
										<Checkbox
											id={addon.id}
											name={field.name}
											aria-invalid={isInvalid}
											checked={field.value.includes(addon.id)}
											onCheckedChange={(checked) => {
												if (checked) {
													field.pushValue(addon.id);
												} else {
													const index = field.value.indexOf(addon.id);
													if (index > -1) {
														field.removeValue(index);
													}
												}
											}}
										/>
										<Field.Content>
											<Field.Label for={addon.id}>
												{addon.title}
											</Field.Label>
											<Field.Description>
												{addon.description}
											</Field.Description>
										</Field.Content>
									</Field.Field>
								{/each}
							</Field.Group>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Set>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="emailNotifications">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field orientation="horizontal" data-invalid={isInvalid}>
							<Field.Content>
								<Field.Label for={field.name}>Email Notifications</Field.Label>
								<Field.Description>Receive email updates about your subscription</Field.Description>
							</Field.Content>
							<Switch
								id={field.name}
								name={field.name}
								checked={field.value}
								onCheckedChange={field.handleChange}
								aria-invalid={isInvalid}
							/>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button type="submit" form="subscription-form">Save Preferences</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
