<script lang="ts" context="module">
	import { z } from "zod";

	export const formSchema = z.object({
		type: z.enum(["all", "mentions", "none"], {
			required_error: "You need to select a notification type"
		})
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/new-york/ui/form";
	// Since the labels used in each radio item don't represent the field
	// we need to use a regular label component instead of Form.Label
	import { Label } from "@/registry/new-york/ui/label";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<FormSchema> = $page.data.radioGroup;
</script>

<Form.Root
	{form}
	schema={formSchema}
	let:config
	method="POST"
	action="?/radioGroup"
	class="w-2/3 space-y-6"
>
	<Form.Field {config} name="type">
		<Form.Item class="space-y-3">
			<Form.Label>Notify me about...</Form.Label>
			<Form.RadioGroup class="flex flex-col space-y-1">
				<Form.Item class="flex items-center space-x-3 space-y-0">
					<Form.RadioItem value="all" id="all" />
					<Label for="all" class="font-normal">All new messages</Label
					>
				</Form.Item>
				<Form.Item class="flex items-center space-x-3 space-y-0">
					<Form.RadioItem value="mentions" id="mentions" />
					<Label for="mentions" class="font-normal"
						>Direct messages and mentions</Label
					>
				</Form.Item>
				<Form.Item class="flex items-center space-x-3 space-y-0">
					<Form.RadioItem value="none" id="none" />
					<Label for="none" class="font-normal">Nothing</Label>
				</Form.Item>
			</Form.RadioGroup>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
