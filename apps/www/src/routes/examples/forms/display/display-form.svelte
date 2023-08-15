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
	import type { SuperValidated } from "sveltekit-superforms";

	export let data: SuperValidated<DisplayFormSchema>;
</script>

<div class="text-base">WIP</div>

<!-- WIP - formFieldProxy doesn't support arrays :( see: https://superforms.rocks/components  -->
<!-- <Form.Root
	schema={displayFormSchema}
	{data}
	let:form
	let:formValues
	let:formStore
	method="POST"
	class="space-y-8"
>
	<div class="mb-4">
		<p class="text-base">Sidebar</p>
		<p>Select the items you want to display in the sidebar.</p>
	</div>
	{#each items as item, i}
		<Form.Field {form} name="items[{i}]" let:field class="space-x-0">
			<div class="mb-4" />
			<div class="flex flex-row items-start space-x-3 space-y-0">
				<Checkbox
					{...field.attrs}
					checked={formValues.items[i] === item.id}
					onCheckedChange={(v) => {
						formStore.update((prev) => {
							if (v) {
								prev.items.push(item.id);
								return prev;
							}
							prev.items.filter((i) => i !== item.id);
							return prev;
						});
					}}
				/>
				<Form.Label>{item.label}</Form.Label>
				<input hidden name={field.attrs.name} value={field.attrs.value} />
			</div>
			<Form.Message />
		</Form.Field>
	{/each}
	<Button type="submit">Update display</Button>
</Form.Root> -->
