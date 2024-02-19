<script lang="ts" context="module">
	import { z } from "zod";
	const items = [
		{
			id: "recents",
			label: "Recents",
		},
		{
			id: "home",
			label: "Home",
		},
		{
			id: "applications",
			label: "Applications",
		},
		{
			id: "desktop",
			label: "Desktop",
		},
		{
			id: "downloads",
			label: "Downloads",
		},
		{
			id: "documents",
			label: "Documents",
		},
	] as const;
	export const displayFormSchema = z.object({
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have select at least one item.",
		}),
	});
	export type DisplayFormSchema = typeof displayFormSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/form";
	import * as Checkbox from "@/registry/new-york/ui/checkbox";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<DisplayFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(displayFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Fieldset {form} name="items" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">Sidebar</Form.Legend>
			<Form.Description>
				Select the items you want to display in the sidebar.
			</Form.Description>
		</div>
		<div class="space-y-2">
			{#each items as item}
				<div class="flex flex-row items-start space-x-3">
					<Form.Control let:attrs>
						<Checkbox.Root
							{...attrs}
							checked={$formData.items.includes(item.id)}
							onCheckedChange={(v) => {
								if (v) {
									$formData.items = [...$formData.items, item.id];
								} else {
									$formData.items = $formData.items.filter((i) => i !== item.id);
								}
							}}
						/>
						<Form.Label class="font-normal">
							{item.label}
						</Form.Label>
					</Form.Control>
				</div>

				<Form.Control></Form.Control>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>
	<Form.Button>Update display</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
