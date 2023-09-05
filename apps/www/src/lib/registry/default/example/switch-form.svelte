<script lang="ts" context="module">
	import { z } from "zod";
	export const formSchema = z.object({
		marketing_emails: z.boolean().default(false).optional(),
		security_emails: z.boolean().default(true)
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema> = $page.data.switch;
</script>

<Form.Root
	{form}
	schema={formSchema}
	let:config
	method="POST"
	action="?/switch"
	class="w-full space-y-6"
>
	<fieldset>
		<legend class="mb-4 text-lg font-medium"> Email Notifications </legend>
		<div class="space-y-4">
			<Form.Field {config} name="marketing_emails">
				<Form.Item
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<div class="space-y-0.5">
						<Form.Label>Marketing emails</Form.Label>
						<Form.Description>
							Receive emails about new products, features, and
							more.
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
						<Form.Label>Security emails</Form.Label>
						<Form.Description>
							Receive emails about your account security.
						</Form.Description>
					</div>
					<Form.Switch aria-readonly disabled />
				</Form.Item>
			</Form.Field>
		</div>
	</fieldset>
	<Form.Button>Submit</Form.Button>
</Form.Root>
