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
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm(() => ({
		defaultValues: {
			language: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Language Preferences</Card.Title>
		<Card.Description>Select your preferred spoken language.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-select"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="language">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field orientation="responsive" data-invalid={isInvalid ? true : undefined}>
							<Field.Content>
								<Field.Label for="form-tanstack-select-language">Spoken Language</Field.Label>
								<Field.Description
									>For best results, select the language you speak.</Field.Description
								>
								{#if isInvalid}
									<Field.Error errors={field.state.meta.errors} />
								{/if}
							</Field.Content>
							<Select.Root
								type="single"
								{items}
								name={field.name}
								value={field.state.value}
								onValueChange={field.handleChange}
							>
								<Select.Trigger
									id="form-tanstack-select-language"
									aria-invalid={isInvalid}
									onblur={field.handleBlur}
									class="min-w-[120px]"
								>
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
