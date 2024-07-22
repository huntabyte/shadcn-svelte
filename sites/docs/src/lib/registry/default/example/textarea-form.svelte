<script lang="ts" context="module">
	import { z } from "zod";
	export const formSchema = z.object({
		bio: z
			.string()
			.min(10, "Bio must be at least 10 characters.")
			.max(160, "Bio must be at most 160 characters."),
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
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";

	let data: SuperValidated<Infer<FormSchema>> = $page.data.textarea;
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
</script>

<form method="POST" action="/?/textarea" class="w-2/3 space-y-6" use:enhance>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea
				{...attrs}
				placeholder="Tell us a little bit about yourself"
				class="resize-none"
				bind:value={$formData.bio}
			/>
			<Form.Description>
				You can <span>@mention</span> other users and organizations.
			</Form.Description>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
