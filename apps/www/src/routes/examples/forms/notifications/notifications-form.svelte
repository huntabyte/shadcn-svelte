<script lang="ts" context="module">
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
	type NotificationFormSchema = typeof notificationsFormSchema;
</script>

<script lang="ts">
	import type { SuperValidated } from "sveltekit-superforms";
	import * as Form from "@/registry/new-york/ui/super-form";
	import { Switch } from "@/registry/new-york/ui/switch";
	import * as RadioGroup from "@/registry/new-york/ui/radio-group";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import { Button } from "@/registry/new-york/ui/button";
	import Label from "@/registry/new-york/ui/label/label.svelte";
	export let data: SuperValidated<NotificationFormSchema>;
</script>

<Form.Root
	{data}
	schema={notificationsFormSchema}
	let:form
	method="POST"
	class="space-y-8"
>
	<Form.Field {form} name="type" let:field>
		<Form.Label>Notify me about...</Form.Label>
		<RadioGroup.Root
			{...field.attrs}
			onValueChange={field.updateValue}
			class="flex flex-col space-y-1"
		>
			<RadioGroup.Input name={field.attrs.name} />
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
				{form}
				name="communication_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
				let:field
			>
				<div class="space-y-0.5">
					<Form.Label class="text-base"
						>Communication emails</Form.Label
					>
					<Form.Description>
						Receive emails about your accoutn activity.
					</Form.Description>
				</div>
				{@const { value, name, ...rest } = field.attrs}
				<Switch
					{...rest}
					checked={value}
					onCheckedChange={field.updateValue}
				/>
				<input hidden {name} {value} />
			</Form.Field>
			<Form.Field
				{form}
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
				{@const { value, name, ...rest } = field.attrs}
				<Switch
					{...rest}
					checked={value}
					onCheckedChange={field.updateValue}
				/>
				<input hidden {name} {value} />
			</Form.Field>
			<Form.Field
				{form}
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
				{@const { value, name, ...rest } = field.attrs}
				<Switch
					{...rest}
					checked={value}
					onCheckedChange={field.updateValue}
				/>
				<input hidden {name} {value} />
			</Form.Field>
			<Form.Field
				{form}
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
				{@const { value, name, ...rest } = field.attrs}
				<Switch
					{...rest}
					checked={value}
					onCheckedChange={field.updateValue}
				/>
				<input hidden {name} {value} />
			</Form.Field>
		</div>
	</div>
	<Form.Field
		{form}
		name="mobile"
		let:field
		class="flex flex-row items-start space-x-3 space-y-0"
	>
		{@const { name, value, ...rest } = field.attrs}
		<Checkbox
			{...rest}
			checked={field.attrs.value}
			onCheckedChange={field.updateValue}
		/>
		<input hidden {name} {value} />
		<div class="space-y-1 leading-none">
			<Form.Label>Use different settings for my mobile devices</Form.Label
			>
			<Form.Description>
				You can manage your mobile notifications in the{" "}<a
					href="/examples/forms">mobile settings</a
				> page.
			</Form.Description>
		</div>
	</Form.Field>
	<Button type="submit">Update notifications</Button>
</Form.Root>
