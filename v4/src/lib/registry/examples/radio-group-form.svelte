<script lang="ts" module>
	import { z } from "zod";

	export const formSchema = z.object({
		type: z.enum(["all", "mentions", "none"], {
			required_error: "You need to select a notification type",
		}),
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import * as Form from "$lib/registry/ui/form/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";

	let { form: data = page.data.radioGroup }: { form: SuperValidated<Infer<FormSchema>> } =
		$props();

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

<form method="POST" action="/?/radioGroup" class="w-2/3 space-y-6" use:enhance>
	<Form.Fieldset {form} name="type" class="space-y-3">
		<Form.Legend>Notify me about...</Form.Legend>
		<RadioGroup.Root bind:value={$formData.type} class="flex flex-col space-y-1" name="type">
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="all" {...props} />
						<Form.Label class="font-normal">All new messages</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="mentions" {...props} />
						<Form.Label class="font-normal">Direction messages and mentions</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="none" {...props} />
						<Form.Label class="font-normal">Nothing</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
		</RadioGroup.Root>
		<Form.FieldErrors />
	</Form.Fieldset>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
