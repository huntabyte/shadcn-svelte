<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	const languages = [
		{ value: "en", label: "English" },
		{ value: "es", label: "Spanish" },
		{ value: "fr", label: "French" },
	];
	const form = createForm(() => ({
		defaultValues: { language: "" },
		validators: { onSubmit: z.object({ language: z.string().min(1, "Select a language.") }) },
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>Language</Card.Title><Card.Description
			>Choose your preferred language.</Card.Description
		></Card.Header
	><Card.Content>
		<form
			id="form-tanstack-select"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="language"
				>{#snippet children(field)}<Field.Field
						data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
						><Field.Label for="form-tanstack-language">Spoken language</Field.Label><Select.Root
							type="single"
							value={field.state.value}
							onValueChange={(value) => field.handleChange(value)}
							name={field.name}
							><Select.Trigger id="form-tanstack-language" class="w-full"
								>{languages.find((item) => item.value === field.state.value)?.label ??
									"Select a language"}</Select.Trigger
							><Select.Content
								>{#each languages as language (language.value)}<Select.Item
										value={language.value}
										label={language.label}>{language.label}</Select.Item
									>{/each}</Select.Content
							></Select.Root
						>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
								errors={field.state.meta.errors.filter((error) => error !== undefined)}
							/>{/if}</Field.Field
					>{/snippet}</form.Field
			>
		</form>
	</Card.Content><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-select">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
