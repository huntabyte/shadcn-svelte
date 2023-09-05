<script lang="ts" context="module">
	import { z } from "zod";
	export const formSchema = z.object({
		mobile: z.boolean().default(false)
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema> = $page.data.checkboxSingle;
</script>

<Form.Root
	method="POST"
	{form}
	schema={formSchema}
	let:config
	action="?/checkboxSingle"
	class="space-y-6"
>
	<Form.Field {config} name="mobile">
		<Form.Item
			class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
		>
			<Form.Checkbox />
			<div class="space-y-1 leading-none">
				<Form.Label
					>Use different settings for my mobile devices</Form.Label
				>
				<Form.Description>
					You can manage your mobile notifications in the <a
						href="/examples/forms">mobile settings</a
					> page.
				</Form.Description>
			</div>
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
