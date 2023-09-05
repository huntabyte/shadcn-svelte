<script lang="ts" context="module">
	import { z } from "zod";

	export const formSchema = z.object({
		email: z
			.string({ required_error: "Please select an email to display" })
			.email()
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema> = $page.data.select;
</script>

<Form.Root
	{form}
	schema={formSchema}
	let:config
	method="POST"
	action="?/select"
	class="w-2/3 space-y-6"
>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label>Email</Form.Label>
			<Form.Select>
				<Form.SelectTrigger
					placeholder="Select a verified email to display"
				/>
				<Form.SelectContent>
					<Form.SelectItem value="m@example.com"
						>m@example.com</Form.SelectItem
					>
					<Form.SelectItem value="m@google.com"
						>m@google.com</Form.SelectItem
					>
					<Form.SelectItem value="m@support.com"
						>m@support.com</Form.SelectItem
					>
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>
				You can manage email address in your <a href="/examples/forms"
					>email settings</a
				>.
			</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
