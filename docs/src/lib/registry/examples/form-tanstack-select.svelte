<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	const spokenLanguages = [
		{ label: "English", value: "en" },
		{ label: "Spanish", value: "es" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Italian", value: "it" },
		{ label: "Chinese", value: "zh" },
		{ label: "Japanese", value: "ja" },
	] as const;
	const formSchema = z.object({
		language: z
			.string()
			.min(1, "Please select your spoken language.")
			.refine((val) => val !== "auto", {
				message: "Auto-detection is not allowed. Please select a specific language.",
			}),
	});
	const form = createForm(() => ({
		defaultValues: {
			language: "",
		},
		validators: [{ run: formSchema, triggers: [] }],
		onSubmit: async ({ value }) => {
			toast("You submitted the following values:", {
				description: FormSubmittedValues,
				componentProps: { value: value },
				position: "bottom-right",
				classes: {
					content: "flex flex-col gap-2",
				},
				style: "--border-radius: calc(var(--radius) + 4px)",
			});
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-lg">
	<Card.Header>
		<Card.Title>Language Preferences</Card.Title>
		<Card.Description>Select your preferred spoken language.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			novalidate
			id="form-tanstack-select"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="language">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Field orientation="responsive" data-invalid={isInvalid}>
							<Field.Content>
								<Field.Label for="form-tanstack-select-language">Spoken Language</Field.Label>
								<Field.Description>
									For best results, select the language you speak.
								</Field.Description>
								{#if isInvalid}
									<Field.Error errors={field.meta.errors} />
								{/if}
							</Field.Content>
							<Select.Root
								name={field.name}
								value={field.value}
								onValueChange={field.handleChange}
								type="single"
							>
								<Select.Trigger
									id="form-tanstack-select-language"
									aria-invalid={isInvalid}
									class="min-w-[120px]"
								>
									{spokenLanguages.find((language) => language.value === field.value)?.label ??
										(field.value === "auto" ? "Auto" : "Select")}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="auto">Auto</Select.Item>
									<Select.Separator />
									{#each spokenLanguages as language (language.value)}
										<Select.Item value={language.value}>
											{language.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Field.Field>
					{/snippet}
				</form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-select">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
