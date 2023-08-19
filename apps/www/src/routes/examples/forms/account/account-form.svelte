<script lang="ts" context="module">
	import { z } from "zod";
	export const languages = [
		{ label: "English", value: "en" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Spanish", value: "es" },
		{ label: "Portuguese", value: "pt" },
		{ label: "Russian", value: "ru" },
		{ label: "Japanese", value: "ja" },
		{ label: "Korean", value: "ko" },
		{ label: "Chinese", value: "zh" }
	] as const;

	export const accountFormSchema = z.object({
		name: z
			.string()
			.min(2, "Name must be at least 2 characters.")
			.max(30, "Name must not be longer than 30 characters"),
		language: z.string({
			required_error: "Please select a language."
		})
	});
	export type AccountFormSchema = typeof accountFormSchema;
	export type AccountFormValues = z.infer<typeof accountFormSchema>;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/super-form";
	import * as Select from "@/registry/new-york/ui/select";
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import type { SuperValidated } from "sveltekit-superforms";
	import { cn } from "@/utils";

	export let data: SuperValidated<AccountFormSchema>;
</script>

<Form.Root
	schema={accountFormSchema}
	{data}
	let:form
	method="POST"
	class="space-y-8"
>
	<Form.Field name="name" let:field {form}>
		<Form.Label>Name</Form.Label>
		<Input
			placeholder="Your name"
			{...field.attrs}
			on:input={field.handleInput}
		/>
		<Form.Description>
			This is the name that will be displayed on your profile and in
			emails.
		</Form.Description>
		<Form.Message />
	</Form.Field>
	<Form.Field name="language" let:field {form}>
		<Form.Label>Language</Form.Label>
		<Select.Root onValueChange={field.updateValue}>
			<Select.Trigger
				{...field.attrs}
				class={cn(
					"w-[200px] justify-between",
					!field.attrs.value && "text-muted-foreground"
				)}
			>
				<Select.Value placeholder="Select language" />
				<Select.Input name={field.attrs.name} />
			</Select.Trigger>
			<Select.Content>
				{#each languages as language}
					<Select.Item value={language.value} label={language.label}>
						{language.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Form.Description>
			This is the language that will be used in the dashboard.
		</Form.Description>
		<Form.Message />
	</Form.Field>
	<Button type="submit">Update account</Button>
</Form.Root>
