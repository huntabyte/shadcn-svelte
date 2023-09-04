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
	import * as Form from "@/registry/default/ui/form";
	import { Switch } from "@/registry/default/ui/switch";
	import * as RadioGroup from "@/registry/default/ui/radio-group";
	import { Checkbox } from "@/registry/default/ui/checkbox";
	import { Button } from "@/registry/default/ui/button";
	import Label from "@/registry/default/ui/label/label.svelte";
	export let data: SuperValidated<NotificationFormSchema>;
</script>

<Form.Root
	form={data}
	schema={notificationsFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={true}
>
	<Form.Item>
		<Form.Field {config} name="type" let:attrs let:setValue>
			{@const { name, value } = attrs.input}
			<Form.Label>Notify me about...</Form.Label>
			<RadioGroup.Root
				{...attrs.input}
				onValueChange={setValue}
				class="flex flex-col space-y-1"
			>
				<RadioGroup.Input {name} {value} />
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
	</Form.Item>
	<div>
		<h3 class="mb-4 text-lg font-medium">Email Notifications</h3>
		<div class="space-y-4">
			<Form.Field {config} name="communication_emails">
				<Form.Item
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Communication emails</Form.Label>
						<Form.Description>
							Receive emails about your accoutn activity.
						</Form.Description>
					</div>
					<Form.Switch />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="marketing_emails">
				<Form.Item
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Marketing emails</Form.Label>
						<Form.Description>
							Receive emails about new products, features, and more.
						</Form.Description>
					</div>
					<Form.Switch />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="social_emails">
				<Form.Item
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Social emails</Form.Label>
						<Form.Description>
							Receive emails for friend requests, follows, and more.
						</Form.Description>
					</div>
					<Form.Switch />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="security_emails">
				<Form.Item
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Security emails</Form.Label>
						<Form.Description>
							Receive emails about your account activity and security.
						</Form.Description>
					</div>
					<Form.Switch />
				</Form.Item>
			</Form.Field>
		</div>
	</div>
	<Form.Field {config} name="mobile">
		<Form.Item class="flex flex-row items-start space-x-3 space-y-0">
			<Form.Checkbox />
			<div class="space-y-1 leading-none">
				<Form.Label>Use different settings for my mobile devices</Form.Label>
				<Form.Description>
					You can manage your mobile notifications in the{" "}<a
						href="/examples/forms">mobile settings</a
					> page.
				</Form.Description>
			</div>
		</Form.Item>
	</Form.Field>
	<Button type="submit">Update notifications</Button>
</Form.Root>
