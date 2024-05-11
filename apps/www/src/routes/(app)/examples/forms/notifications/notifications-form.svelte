<script lang="ts" context="module">
	import { z } from "zod";
	export const notificationsFormSchema = z.object({
		type: z.enum(["all", "mentions", "none"], {
			required_error: "You need to select a notification type.",
		}),
		mobile: z.boolean().default(false).optional(),
		communication_emails: z.boolean().default(false).optional(),
		social_emails: z.boolean().default(false).optional(),
		marketing_emails: z.boolean().default(false).optional(),
		security_emails: z.boolean(),
	});
	type NotificationFormSchema = typeof notificationsFormSchema;
</script>

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as RadioGroup from "$lib/registry/new-york/ui/radio-group/index.js";
	import { Switch } from "$lib/registry/new-york/ui/switch/index.js";
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<NotificationFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(notificationsFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-8">
	<Form.Fieldset {form} name="type">
		<Form.Legend>Notify me about...</Form.Legend>
		<Form.Control>
			<RadioGroup.Root bind:value={$formData.type}>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="all" {...attrs} />
						<Form.Label>All new messages</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="mentions" {...attrs} />
						<Form.Label>Direct messages and mentions</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3">
					<Form.Control let:attrs>
						<RadioGroup.Item value="none" {...attrs} />
						<Form.Label>Nothing</Form.Label>
					</Form.Control>
				</div>
				<RadioGroup.Input name="type" />
			</RadioGroup.Root>
		</Form.Control>
	</Form.Fieldset>
	<div>
		<h3 class="mb-4 text-lg font-medium">Email Notifications</h3>
		<div class="space-y-4">
			<Form.Field
				{form}
				name="communication_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Communication emails</Form.Label>
						<Form.Description>
							Receive emails about your account activity.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.communication_emails} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="marketing_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Marketing emails</Form.Label>
						<Form.Description>
							Receive emails about new products, features, and more.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.marketing_emails} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="social_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Social emails</Form.Label>
						<Form.Description>
							Receive emails for friend requests, follows, and more.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.social_emails} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="security_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Security emails</Form.Label>
						<Form.Description>
							Receive emails about your account activity and security.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.security_emails} />
				</Form.Control>
			</Form.Field>
		</div>
	</div>
	<Form.Field {form} name="mobile" class="flex flex-row items-start space-x-3 space-y-0">
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.mobile} />
			<div class="space-y-1 leading-none">
				<Form.Label>Use different settings for my mobile devices</Form.Label>
				<Form.Description>
					You can manage your mobile notifications in the <a href="/examples/forms"
						>mobile settings</a
					> page.
				</Form.Description>
			</div>
			<input name={attrs.name} value={$formData.mobile} hidden />
		</Form.Control>
	</Form.Field>
	<Form.Button>Update notifications</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
