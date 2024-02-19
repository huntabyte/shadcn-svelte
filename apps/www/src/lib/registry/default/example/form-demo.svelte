<script lang="ts" context="module">
	import { z } from "zod";

	export const formSchema = z.object({
		username: z.string().min(2).max(50),
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/default/ui/form";
	import { Input } from "@/registry/default/ui/input";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };
	const form = superForm(data, {
		validators: zodClient(formSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form action="?/username" method="POST" class="w-2/3 space-y-6" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
