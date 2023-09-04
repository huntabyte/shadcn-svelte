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
			.string()
			.min(2, "Name must be at least 2 characters.")
			.max(30, "Name must not be longer than 30 characters"),
		// Hack: https://github.com/colinhacks/zod/issues/2280
		language: z.enum(Object.keys(languages) as [Language, ...Language[]])
	});

	export type AccountFormSchema = typeof accountFormSchema;
	export type AccountFormValues = z.infer<typeof accountFormSchema>;
</script>

<script lang="ts">
	import * as Form from "@/registry/default/ui/form";
	import * as Select from "@/registry/default/ui/select";
	import { Button } from "@/registry/default/ui/button";
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
				This is the name that will be displayed on your profile and in emails.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="language" let:attrs let:setValue>
			{@const { value, name } = attrs.input}
			<Form.Label>Language</Form.Label>
			<Select.Root
				onSelectedChange={(v) => v && setValue(v.value)}
				selected={{ value, label: languages[value] }}
			>
				<Select.Trigger
					{...attrs.input}
					class={cn(
						"w-[200px] justify-between",
						!attrs.input.value && "text-muted-foreground"
					)}
				>
					<Select.Value placeholder="Select language" />
					<Select.Input {name} {value} />
				</Select.Trigger>
				<Select.Content>
					{#each Object.entries(languages) as [value, lang]}
						<Select.Item {value} label={lang}>
							{lang}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Form.Description>
				This is the language that will be used in the dashboard.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Button type="submit">Update account</Button>
</Form.Root>
