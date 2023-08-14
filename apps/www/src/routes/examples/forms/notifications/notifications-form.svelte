<script lang="ts" context="module">
	import type { SuperValidated } from "sveltekit-superforms";
	import { z } from "zod";

	export const notificationsFormSchema = z.object({
		type: z.enum(["all", "mentions", "none"], {
			required_error: "You need to select a notification type."
		}),
		mobile: z.boolean().default(false).optional(),
		communication_emails: z.boolean().default(false).optional(),
		social_emails: z.boolean().default(false).optional(),
		marketing_emails: z.boolean().default(false).optional(),
		security_emails: z.boolean()
	});

	export type NotificationFormSchema = typeof notificationsFormSchema;
	export type NotificationFormValues = z.infer<typeof notificationsFormSchema>;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/form";
	import { Switch } from "@/registry/new-york/ui/switch";
	import * as RadioGroup from "@/registry/new-york/ui/radio-group";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import { Button } from "@/registry/new-york/ui/button";
	import { superForm } from "sveltekit-superforms/client";
	import Label from "@/registry/new-york/ui/label/label.svelte";
	export let data: SuperValidated<NotificationFormSchema>;

	const { form, errors, enhance } = superForm(data, {
		validators: notificationsFormSchema,
		taintedMessage: null
	});
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field errors={$errors.type} name="type" let:field>
		<Form.Label>Notify me about...</Form.Label>
		<RadioGroup.Root bind:value={$form.type} class="flex flex-col space-y-1">
			<RadioGroup.Input {...field} />
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="all" id="all" />
				<Label for="all" class="font-normal">All new messages</Label>
			</div>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="mentions" id="mentions" />
				<Label for="mentions" class="font-normal"
					>Direct messages and mentions</Label
				>
			</div>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="none" id="none" />
				<Label for="none" class="font-normal">Nothing</Label>
			</div>
		</RadioGroup.Root>
	</Form.Field>
	<div>
		<h3 class="mb-4 text-lg font-medium">Email Notifications</h3>
		<div class="space-y-4">
			<Form.Field
				errors={$errors.communication_emails}
				name="communication_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
				let:field
			>
				<div class="space-y-0.5">
					<Form.Label class="text-base">Communication emails</Form.Label>
					<Form.Description>
						Receive emails about your accoutn activity.
					</Form.Description>
				</div>
				<input
					hidden
					value={$form.communication_emails}
					name="communication_emails"
				/>
				<Switch bind:checked={$form.communication_emails} {...field} />
			</Form.Field>
			<Form.Field
				errors={$errors.marketing_emails}
				name="marketing_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
				let:field
			>
				<div class="space-y-0.5">
					<Form.Label class="text-base">Marketing emails</Form.Label>
					<Form.Description>
						Receive emails about new products, features, and more.
					</Form.Description>
				</div>
				<input hidden value={$form.marketing_emails} name="marketing_emails" />
				<Switch bind:checked={$form.marketing_emails} {...field} />
			</Form.Field>
			<Form.Field
				errors={$errors.social_emails}
				name="social_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
				let:field
			>
				<div class="space-y-0.5">
					<Form.Label class="text-base">Social emails</Form.Label>
					<Form.Description>
						Receive emails for friend requests, follows, and more.
					</Form.Description>
				</div>
				<input hidden value={$form.social_emails} name="social_emails" />
				<Switch bind:checked={$form.social_emails} {...field} />
			</Form.Field>
			<Form.Field
				errors={$errors.security_emails}
				name="security_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
				let:field
			>
				<div class="space-y-0.5">
					<Form.Label class="text-base">Security emails</Form.Label>
					<Form.Description>
						Receive emails about your account activity and security.
					</Form.Description>
				</div>
				<input hidden value={$form.security_emails} name="security_email" />
				<Switch bind:checked={$form.security_emails} {...field} />
			</Form.Field>
		</div>
	</div>
	<Form.Field
		errors={$errors.mobile}
		name="mobile"
		let:field
		class="flex flex-row items-start space-x-3 space-y-0"
	>
		<input hidden value={$form.mobile} name="mobile" />
		<Checkbox bind:checked={$form.mobile} {...field} />
		<div class="space-y-1 leading-none">
			<Form.Label>Use different settings for my mobile devices</Form.Label>
			<Form.Description>
				You can manage your mobile notifications in the{" "}<a
					href="/examples/forms">mobile settings</a
				> page.
			</Form.Description>
		</div>
	</Form.Field>
	<Button type="submit">Update notifications</Button>
</form>
