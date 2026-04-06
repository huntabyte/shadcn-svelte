<script lang="ts" module>
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

	const formSchema = z.object({
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
	});
</script>

<script lang="ts">
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = superForm(defaults(zod4(formSchema)), {
		SPA: true,
		validators: zod4(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, errors, enhance } = form;

	function addItem(id: string) {
		$formData.items = [...$formData.items, id];
	}

	function removeItem(id: string) {
		$formData.items = $formData.items.filter((i) => i !== id);
	}
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Field.Set class="space-y-0">
		<div class="mb-4">
			<Field.Legend class="text-base">Sidebar</Field.Legend>
			<Field.Description>
				Select the items you want to display in the sidebar.
			</Field.Description>
		</div>
		<div class="space-y-2">
			{#each items as item (item.id)}
				{@const checked = $formData.items.includes(item.id)}
				<Field.Field orientation="horizontal">
					<Checkbox
						id={item.id}
						name="items"
						{checked}
						value={item.id}
						onCheckedChange={(v) => {
							if (v) {
								addItem(item.id);
							} else {
								removeItem(item.id);
							}
						}}
					/>
					<Field.Label for={item.id} class="font-normal">
						{item.label}
					</Field.Label>
				</Field.Field>
			{/each}
			<Field.Error errors={($errors.items ?? []).map((m) => ({ message: m }))} />
		</div>
	</Field.Set>
	<Button type="submit">Update display</Button>
</form>
