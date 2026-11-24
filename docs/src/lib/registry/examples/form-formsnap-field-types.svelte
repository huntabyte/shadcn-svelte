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
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
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
		<Form.Field {form} name="language">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Language</Form.Label>
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
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Radio group -->
		<Form.Fieldset {form} name="plan">
			{#snippet children({ errors })}
				<Form.Legend variant="label">Plan</Form.Legend>
				<RadioGroup.Root bind:value={$formData.plan} name="plan">
					{#each plans as plan (plan.value)}
						<Field.Field orientation="horizontal" data-invalid={errors.length > 0 ? true : undefined}>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item {...props} value={plan.value} />
									<Form.Label class="font-normal">{plan.label}</Form.Label>
								{/snippet}
							</Form.Control>
						</Field.Field>
					{/each}
				</RadioGroup.Root>
				<Form.FieldErrors />
			{/snippet}
		</Form.Fieldset>

		<!-- Checkbox group -->
		<Form.Fieldset {form} name="notifications">
			<Form.Legend variant="label">Notifications</Form.Legend>
			<Field.Group class="gap-3">
				{#each notifications as notification, i (notification.value)}
					<Form.ElementField {form} name="notifications[{i}]" orientation="horizontal">
						<Form.Control>
							{#snippet children({ props })}
								<Checkbox
									{...props}
									value={notification.value}
									checked={$formData.notifications.includes(notification.value)}
									onCheckedChange={(checked) => toggleNotification(notification.value, checked)}
								/>
								<Form.Label class="font-normal">{notification.label}</Form.Label>
							{/snippet}
						</Form.Control>
					</Form.ElementField>
				{/each}
			</Field.Group>
			<Form.FieldErrors />
		</Form.Fieldset>

		<!-- Switch -->
		<Form.Field {form} name="marketing" orientation="horizontal">
			<Form.Control>
				{#snippet children({ props })}
					<Field.Content>
						<Form.Label>Marketing emails</Form.Label>
						<Form.Description>Receive news, updates, and special offers.</Form.Description>
					</Field.Content>
					<Switch {...props} bind:checked={$formData.marketing} />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<!-- Checkbox -->
		<Form.Field {form} name="terms" orientation="horizontal">
			<Form.Control>
				{#snippet children({ props })}
					<Checkbox {...props} bind:checked={$formData.terms} />
					<Field.Content>
						<Form.Label class="font-normal">I accept the terms and conditions</Form.Label>
						<Form.FieldErrors />
					</Field.Content>
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Field.Field orientation="horizontal">
			<Button type="submit">Submit</Button>
		</Field.Field>
	</Field.Group>
</form>
