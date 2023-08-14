<script lang="ts" context="module">
	import { z } from "zod";

	export const displayFormSchema = z.object({
		items: z
			.array(z.string())
			.refine((value) => value.some((item) => item), {
				message: "You have to select at least one item."
			})
			.default(["recents", "home"])
	});

	export type DisplayFormSchema = typeof displayFormSchema;
	export type DisplayFormValues = z.infer<typeof displayFormSchema>;

	const items = [
		{
			id: "recents",
			label: "Recents"
		},
		{
			id: "home",
			label: "Home"
		},
		{
			id: "applications",
			label: "Applications"
		},
		{
			id: "desktop",
			label: "Desktop"
		},
		{
			id: "downloads",
			label: "Downloads"
		},
		{
			id: "documents",
			label: "Documents"
		}
	] as const;
</script>

<script lang="ts">
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import * as Form from "@/registry/new-york/ui/form";
	import { Label } from "@/registry/new-york/ui/label";
	import type { SuperValidated } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";

	import { Button } from "@/registry/new-york/ui/button";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";

	export let data: SuperValidated<DisplayFormSchema>;
	const { form, errors, enhance } = superForm(data, {
		validators: displayFormSchema,
		taintedMessage: null
	});
</script>

<form class="space-y-8" method="POST" use:enhance>
	<Form.Field errors={$errors.items?._errors} name="items" let:field>
		<div class="mb-4">
			<Form.Label class="text-base">Sidebar</Form.Label>
			<Form.Description>
				Select the items you want to display in the sidebar.
			</Form.Description>
		</div>
		{#each items as item, i}
			<div class="flex flex-row items-start space-x-3 space-y-0">
				<input value={$form.items[i]} {...field} hidden />
				<Checkbox
					id={item.id}
					checked={$form.items[i] === item.id}
					onCheckedChange={(checked) => {
						if (checked) {
							$form.items[i] = item.id;
						} else {
							$form.items[i] = "";
						}
					}}
				/>
				<Label for={item.id}>
					{item.label}
				</Label>
			</div>
		{/each}
		<Form.Message />
	</Form.Field>
	<Button type="submit">Update display</Button>
</form>
