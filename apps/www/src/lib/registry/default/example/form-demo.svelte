<script lang="ts" context="module">
	import { z } from "zod";

	export const formSchema = z.object({
		username: z.string().min(2).max(50)
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";

	export let form: SuperValidated<FormSchema>;
</script>

<Form.Root
	schema={formSchema}
	{form}
	let:config
	method="POST"
	action="?/username"
	class="w-2/3 space-y-6"
>
	<Form.Field {config} name="username">
		<Form.Item>
			<Form.Label>Username</Form.Label>
			<Form.Input />
			<Form.Description
				>This is your public display name.</Form.Description
			>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
