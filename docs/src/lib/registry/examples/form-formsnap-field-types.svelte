<script lang="ts" module>
	import { z } from "zod";

	const languages = [
		{ label: "English", value: "en" },
		{ label: "Spanish", value: "es" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
	];

	const plans = [
		{ label: "Starter", value: "starter" },
		{ label: "Pro", value: "pro" },
		{ label: "Enterprise", value: "enterprise" },
	];

	const notifications = [
		{ label: "Comments", value: "comments" },
		{ label: "Mentions", value: "mentions" },
		{ label: "Releases", value: "releases" },
	];

	const formSchema = z.object({
		language: z.string().min(1, "Please select a language."),
		plan: z.enum(["starter", "pro", "enterprise"], "Please select a plan."),
		notifications: z.array(z.string()).min(1, "Select at least one notification type."),
		marketing: z.boolean(),
		terms: z.boolean().refine((value) => value, "You must accept the terms and conditions."),
	});
</script>

<script lang="ts">
	import * as Formsnap from "formsnap";
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const form = superForm(
		defaults({ language: "", notifications: [], marketing: false, terms: false }, zod4(formSchema)),
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

	function toggleNotification(value: string, checked: boolean) {
		if (checked) {
			$formData.notifications = [...$formData.notifications, value];
		} else {
			$formData.notifications = $formData.notifications.filter((item) => item !== value);
		}
	}
</script>

<form method="POST" class="w-full max-w-sm" use:enhance>
	<Field.Group>
		<!-- Select -->
		<Formsnap.Field {form} name="language">
			{#snippet children({ errors })}
				<Field.Field data-invalid={errors.length > 0}>
					<Formsnap.Control>
						{#snippet children({ props })}
							<Formsnap.Label>
								{#snippet child({ props: labelProps })}
									<Field.Label {...labelProps}>Language</Field.Label>
								{/snippet}
							</Formsnap.Label>
							<Select.Root
								type="single"
								items={languages}
								bind:value={$formData.language}
								name={props.name}
							>
								<Select.Trigger {...props} class="w-full">
									<Select.Value placeholder="Select a language" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each languages as language (language.value)}
											<Select.Item value={language.value} label={language.label}>
												{language.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Formsnap.Control>
					<Formsnap.FieldErrors>
						{#snippet child({ props, errors })}
							<Field.Error {...props} errors={errors.map((message) => ({ message }))} />
						{/snippet}
					</Formsnap.FieldErrors>
				</Field.Field>
			{/snippet}
		</Formsnap.Field>

		<!-- Radio group -->
		<Formsnap.Fieldset {form} name="plan">
			{#snippet child({ props, errors })}
				<Field.Set {...props}>
					<Formsnap.Legend>
						{#snippet child({ props: legendProps })}
							<Field.Legend variant="label" {...legendProps}>Plan</Field.Legend>
						{/snippet}
					</Formsnap.Legend>
					<RadioGroup.Root bind:value={$formData.plan} name="plan">
						{#each plans as plan (plan.value)}
							<Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
								<Formsnap.Control>
									{#snippet children({ props })}
										<RadioGroup.Item {...props} value={plan.value} />
										<Formsnap.Label>
											{#snippet child({ props: labelProps })}
												<Field.Label {...labelProps} class="font-normal">
													{plan.label}
												</Field.Label>
											{/snippet}
										</Formsnap.Label>
									{/snippet}
								</Formsnap.Control>
							</Field.Field>
						{/each}
					</RadioGroup.Root>
					<Formsnap.FieldErrors>
						{#snippet child({ props, errors })}
							<Field.Error {...props} errors={errors.map((message) => ({ message }))} />
						{/snippet}
					</Formsnap.FieldErrors>
				</Field.Set>
			{/snippet}
		</Formsnap.Fieldset>

		<!-- Checkbox group -->
		<Formsnap.Fieldset {form} name="notifications">
			{#snippet child({ props, errors })}
				<Field.Set {...props}>
					<Formsnap.Legend>
						{#snippet child({ props: legendProps })}
							<Field.Legend variant="label" {...legendProps}>Notifications</Field.Legend>
						{/snippet}
					</Formsnap.Legend>
					<Field.Group class="gap-3">
						{#each notifications as notification, i (notification.value)}
							<Formsnap.ElementField {form} name="notifications[{i}]">
								<Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
									<Formsnap.Control>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												value={notification.value}
												checked={$formData.notifications.includes(notification.value)}
												onCheckedChange={(checked) =>
													toggleNotification(notification.value, checked)}
											/>
											<Formsnap.Label>
												{#snippet child({ props: labelProps })}
													<Field.Label {...labelProps} class="font-normal">
														{notification.label}
													</Field.Label>
												{/snippet}
											</Formsnap.Label>
										{/snippet}
									</Formsnap.Control>
								</Field.Field>
							</Formsnap.ElementField>
						{/each}
					</Field.Group>
					<Formsnap.FieldErrors>
						{#snippet child({ props, errors })}
							<Field.Error {...props} errors={errors.map((message) => ({ message }))} />
						{/snippet}
					</Formsnap.FieldErrors>
				</Field.Set>
			{/snippet}
		</Formsnap.Fieldset>

		<!-- Switch -->
		<Formsnap.Field {form} name="marketing">
			{#snippet children({ errors })}
				<Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
					<Formsnap.Control>
						{#snippet children({ props })}
							<Field.Content>
								<Formsnap.Label>
									{#snippet child({ props: labelProps })}
										<Field.Label {...labelProps}>Marketing emails</Field.Label>
									{/snippet}
								</Formsnap.Label>
								<Formsnap.Description>
									{#snippet child({ props: descriptionProps })}
										<Field.Description {...descriptionProps}>
											Receive news, updates, and special offers.
										</Field.Description>
									{/snippet}
								</Formsnap.Description>
							</Field.Content>
							<Switch {...props} bind:checked={$formData.marketing} />
						{/snippet}
					</Formsnap.Control>
				</Field.Field>
			{/snippet}
		</Formsnap.Field>

		<!-- Checkbox -->
		<Formsnap.Field {form} name="terms">
			{#snippet children({ errors })}
				<Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
					<Formsnap.Control>
						{#snippet children({ props })}
							<Checkbox {...props} bind:checked={$formData.terms} />
							<Field.Content>
								<Formsnap.Label>
									{#snippet child({ props: labelProps })}
										<Field.Label {...labelProps} class="font-normal">
											I accept the terms and conditions
										</Field.Label>
									{/snippet}
								</Formsnap.Label>
								<Formsnap.FieldErrors>
									{#snippet child({ props: errorProps, errors })}
										<Field.Error {...errorProps} errors={errors.map((message) => ({ message }))} />
									{/snippet}
								</Formsnap.FieldErrors>
							</Field.Content>
						{/snippet}
					</Formsnap.Control>
				</Field.Field>
			{/snippet}
		</Formsnap.Field>

		<Field.Field orientation="horizontal">
			<Button type="submit">Submit</Button>
		</Field.Field>
	</Field.Group>
</form>
