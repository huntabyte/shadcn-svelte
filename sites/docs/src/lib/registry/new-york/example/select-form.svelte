<script lang="ts" module>
	import { z } from "zod";

	export const formSchema = z.object({
		email: z.string({ required_error: "Please select an email to display" }).email(),
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	let { form: data = $page.data.select }: { form: SuperValidated<Infer<FormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="/?/select" class="w-2/3 space-y-6" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Select.Root bind:value={$formData.email} name={attrs.name}>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a verified email to display" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="m@example.com" textValue="m@example.com" />
					<Select.Item value="m@google.com" textValue="m@google.com" />
					<Select.Item value="m@support.com" textValue="m@support.com" />
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.Description>
			You can manage email address in your <a href="/examples/forms">email settings</a>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
