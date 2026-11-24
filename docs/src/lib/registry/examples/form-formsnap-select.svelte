<script lang="ts" module>
	import { z } from "zod";

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

	const formSchema = z.object({
		language: z
			.string()
			.min(1, "Please select your spoken language.")
			.refine((val) => val !== "auto", {
				message: "Auto-detection is not allowed. Please select a specific language.",
			}),
	});
</script>

<script lang="ts">
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = superForm(defaults({ language: "" }, zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Language Preferences</Card.Title>
		<Card.Description>Select your preferred spoken language.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-select" method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="language" orientation="responsive">
					<Form.Control>
						{#snippet children({ props })}
							<Field.Content>
								<Form.Label>Spoken Language</Form.Label>
								<Form.Description>For best results, select the language you speak.</Form.Description
								>
								<Form.FieldErrors />
							</Field.Content>
							<Select.Root type="single" {items} bind:value={$formData.language} name={props.name}>
								<Select.Trigger {...props} class="min-w-[120px]">
									<Select.Value placeholder="Select" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="auto" label="Auto">Auto</Select.Item>
									<Select.Separator />
									{#each spokenLanguages as language (language.value)}
										<Select.Item value={language.value} label={language.label}>
											{language.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
				</Form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-select">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
