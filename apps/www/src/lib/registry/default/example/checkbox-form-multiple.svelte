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

	export const formSchema = z.object({
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/new-york/ui/form";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";

	let data: SuperValidated<Infer<FormSchema>> = $page.data.checkboxMultiple;
	export { data as form };

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success("You submitted" + JSON.stringify(f.data, null, 2));
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance } = form;

	function addItem(id: string) {
		$formData.items = [...$formData.items, id];
	}

	function removeItem(id: string) {
		$formData.items = $formData.items.filter((i) => i !== id);
	}
</script>

<form action="?/checkboxMultiple" method="POST" class="space-y-8" use:enhance>
	<Form.Fieldset {form} name="items" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">Sidebar</Form.Legend>
			<Form.Description>
				Select the items you want to display in the sidebar.
			</Form.Description>
		</div>
		<div class="space-y-2">
			{#each items as item}
				{@const checked = $formData.items.includes(item.id)}
				<div class="flex flex-row items-start space-x-3">
					<Form.Control let:attrs>
						<!-- We pull out the name so it doesn't get used on the `Checkbox` underlying checkbox hidden input -->
						{@const { name, ...rest } = attrs}
						<Checkbox
							{...rest}
							{checked}
							onCheckedChange={(v) => {
								if (v) {
									addItem(item.id);
								} else {
									removeItem(item.id);
								}
							}}
						/>
						<Form.Label class="font-normal">
							{item.label}
						</Form.Label>
						<!-- Custom input since we are not using the standard `boolean` value -->
						<input hidden type="checkbox" {name} value={item.id} {checked} />
					</Form.Control>
				</div>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>
	<Form.Button>Update display</Form.Button>
	<SuperDebug data={$formData} />
</form>
