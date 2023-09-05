<script lang="ts" context="module">
	import { z } from "zod";

	const languages = {
		en: "English",
		fr: "French",
		de: "German",
		es: "Spanish",
		pt: "Portuguese",
		ru: "Russian",
		ja: "Japanese",
		ko: "Korean",
		zh: "Chinese"
	} as const;

	type Language = keyof typeof languages;

	export const accountFormSchema = z.object({
		name: z
			.string({
				required_error: "Required."
			})
			.min(2, "Name must be at least 2 characters.")
			.max(30, "Name must not be longer than 30 characters"),
		// Hack: https://github.com/colinhacks/zod/issues/2280
		language: z.enum(Object.keys(languages) as [Language, ...Language[]])
	});

	export type AccountFormSchema = typeof accountFormSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	import { cn } from "@/utils";

	export let data: SuperValidated<AccountFormSchema>;
</script>

<Form.Root
	method="POST"
	class="space-y-8"
	let:config
	schema={accountFormSchema}
	form={data}
	debug={true}
>
	<Form.Item>
		<Form.Field name="name" {config}>
			<Form.Label>Name</Form.Label>
			<Form.Input placeholder="Your name" />
			<Form.Description>
				This is the name that will be displayed on your profile and in
				emails.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="language" let:attrs>
			{@const { value } = attrs.input}
			<Form.Label>Language</Form.Label>
			<Form.Select selected={{ value, label: languages[value] }}>
				<Form.SelectTrigger
					placeholder="Select language"
					class={cn(
						"w-[200px] justify-between",
						!attrs.input.value && "text-muted-foreground"
					)}
				/>
				<Form.SelectContent class="h-52 overflow-y-auto">
					{#each Object.entries(languages) as [value, lang]}
						<Form.SelectItem {value}>
							{lang}
						</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>
				This is the language that will be used in the dashboard.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button>Update account</Form.Button>
</Form.Root>
