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
	];

	const items = [{ label: "Auto", value: "auto" }, ...spokenLanguages];

	const FormSchema = v.object({
		language: v.pipe(
			v.string(),
			v.nonEmpty("Please select your spoken language."),
			v.check(
				(value) => value !== "auto",
				"Auto-detection is not allowed. Please select a specific language."
			)
		),
	});
</script>

<script lang="ts">
	import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { language: "" },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Language Preferences</Card.Title>
		<Card.Description>Select your preferred spoken language.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-select">
			<Field.Group>
				<Form.Field of={form} path={["language"]} orientation="responsive">
					{#snippet children(field)}
						<Form.Control custom>
							{#snippet children({ props })}
								<Field.Content>
									<Form.Label>Spoken Language</Form.Label>
									<Form.Description
										>For best results, select the language you speak.</Form.Description
									>
									<Form.FieldErrors />
								</Field.Content>
								<Select.Root
									type="single"
									{items}
									value={field.input ?? ""}
									onValueChange={(value) => field.onInput(value)}
								>
									<Select.Trigger {...props} class="min-w-[120px]">
										<Select.Value placeholder="Select" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Item value="auto" label="Auto">Auto</Select.Item>
										</Select.Group>
										<Select.Separator />
										<Select.Group>
											{#each spokenLanguages as language (language.value)}
												<Select.Item value={language.value} label={language.label}>
													{language.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
					{/snippet}
				</Form.Field>
			</Field.Group>
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-select">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
