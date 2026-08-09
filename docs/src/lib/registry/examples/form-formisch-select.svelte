<script lang="ts" module>
	import * as v from "valibot";

	const spokenLanguages = [
		{ label: "English", value: "en" },
		{ label: "Spanish", value: "es" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Italian", value: "it" },
		{ label: "Chinese", value: "zh" },
		{ label: "Japanese", value: "ja" },
	] as const;

	const FormSchema = v.object({
		language: v.pipe(
			v.string(),
			v.minLength(1, "Please select your spoken language."),
			v.check(
				(value) => value !== "auto",
				"Auto-detection is not allowed. Please select a specific language."
			)
		),
	});
</script>

<script lang="ts">
	import { createForm, Field as FormischField, Form, reset } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

	const form = createForm({ schema: FormSchema, initialInput: { language: "" } });
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-lg">
	<Card.Header>
		<Card.Title>Language Preferences</Card.Title>
		<Card.Description>Select your preferred spoken language.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-select" onsubmit={handleSubmit}>
			<FormischField of={form} path={["language"]}>
				{#snippet children(field)}
					<Field.Field orientation="responsive" data-invalid={field.errors !== null}>
						<Field.Content>
							<Field.Label for="form-formisch-select-language">Spoken Language</Field.Label>
							<Field.Description>
								For best results, select the language you speak.
							</Field.Description>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Content>
						<Select.Root type="single" value={field.input ?? ""} onValueChange={field.onInput}>
							<Select.Trigger
								id="form-formisch-select-language"
								aria-invalid={field.errors !== null}
								class="min-w-[120px]"
							>
								{spokenLanguages.find((language) => language.value === field.input)?.label ??
									"Select"}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="auto" label="Auto" />
								<Select.Separator />
								{#each spokenLanguages as language (language.value)}
									<Select.Item {...language} />
								{/each}
							</Select.Content>
						</Select.Root>
					</Field.Field>
				{/snippet}
			</FormischField>
		</Form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-select">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
