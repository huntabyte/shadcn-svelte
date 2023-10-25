<script lang="ts" context="module">
	import { z } from "zod";
	export const formSchema = z.object({
		bio: z
			.string()
			.min(10, "Bio must be at least 10 characters.")
			.max(160, "Bio must be at most 160 characters.")
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema> = $page.data.textarea;
</script>

<Form.Root
	{form}
	schema={formSchema}
	let:config
	method="POST"
	action="?/textarea"
	class="w-2/3 space-y-6"
>
	<Form.Field {config} name="bio">
		<Form.Item>
			<Form.Label>Bio</Form.Label>
			<Form.Textarea
				placeholder="Tell us a little bit about yourself"
				class="resize-none"
			/>
			<Form.Description>
				You can <span>@mention</span> other users and organizations.
			</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
