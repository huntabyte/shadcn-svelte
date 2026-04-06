<script lang="ts" module>
	import { z } from "zod";

	const items = [
		{ id: "finder-pref-9k2-hard-disks-ljj", label: "Hard disks" },
		{ id: "finder-pref-9k2-external-disks-1yg", label: "External disks" },
		{ id: "finder-pref-9k2-cds-dvds-fzt", label: "CDs, DVDs, and iPods" },
		{ id: "finder-pref-9k2-connected-servers-6l2", label: "Connected servers" },
	] as const;

	const formSchema = z.object({
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
	});
</script>

<script lang="ts">
	import { defaults, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms/SuperDebug.svelte";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { browser } from "$app/environment";
	import { toast } from "svelte-sonner";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = superForm(
		defaults(
			{ items: ["finder-pref-9k2-hard-disks-ljj", "finder-pref-9k2-external-disks-1yg"] },
			zod4(formSchema)
		),
		{
			SPA: true,
			validators: zod4(formSchema),
			onUpdate: ({ form: f }) => {
				if (f.valid) {
					toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
				} else {
					toast.error("Please fix the errors in the form.");
				}
			},
		}
	);

	const { form: formData, errors, enhance } = form;

	function addItem(id: string) {
		$formData.items = [...$formData.items, id];
	}

	function removeItem(id: string) {
		$formData.items = $formData.items.filter((i) => i !== id);
	}
</script>

<div class="flex gap-8">
	<form method="POST" class="flex-1 space-y-8" use:enhance>
		<Field.Set>
			<Field.Legend variant="label">Show these items on the desktop:</Field.Legend>
			<Field.Group class="gap-3">
				{#each items as item (item.id)}
					{@const checked = $formData.items.includes(item.id)}
					<Field.Field orientation="horizontal">
						<Checkbox
							id="{item.id}-checkbox"
							name="{item.id}-checkbox"
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
						<Field.Label for="{item.id}-checkbox" class="font-normal">
							{item.label}
						</Field.Label>
					</Field.Field>
				{/each}
				<Field.Error errors={(($errors.items as string[] | undefined) ?? []).map((m) => ({ message: m }))} />
			</Field.Group>
		</Field.Set>
		<Button type="submit">Submit</Button>
	</form>
	{#if browser}
		<div class="flex-1">
			<SuperDebug data={$formData} />
		</div>
	{/if}
</div>
