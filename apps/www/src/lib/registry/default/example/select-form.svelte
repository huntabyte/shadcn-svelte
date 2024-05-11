<script lang="ts" context="module">
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
	import * as Form from "$lib/registry/default/ui/form/index.js";
	import * as Select from "$lib/registry/default/ui/select/index.js";
	let data: SuperValidated<Infer<FormSchema>> = $page.data.select;
	export { data as form };

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

	$: selectedEmail = $formData.email
		? {
				label: $formData.email,
				value: $formData.email,
			}
		: undefined;
</script>

<form method="POST" action="/?/select" class="w-2/3 space-y-6" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Select.Root
				selected={selectedEmail}
				onSelectedChange={(v) => {
					v && ($formData.email = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a verified email to display" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="m@example.com" label="m@example.com" />
					<Select.Item value="m@google.com" label="m@google.com" />
					<Select.Item value="m@support.com" label="m@support.com" />
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.email} name={attrs.name} />
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
