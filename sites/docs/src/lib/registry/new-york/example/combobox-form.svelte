<script lang="ts" module>
	import { z } from "zod";

	const languages = [
		{ label: "English", value: "en" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Spanish", value: "es" },
		{ label: "Portuguese", value: "pt" },
		{ label: "Russian", value: "ru" },
		{ label: "Japanese", value: "ja" },
		{ label: "Korean", value: "ko" },
		{ label: "Chinese", value: "zh" },
	] as const;

	type Language = (typeof languages)[number]["value"];

	export const formSchema = z.object({
		language: z.enum(languages.map((f) => f.value) as [Language, ...Language[]], {
			errorMap: () => ({ message: "Please select a valid language." }),
		}),
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { tick } from "svelte";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { useId } from "bits-ui";
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

	let { form: data = page.data.combobox }: { form: SuperValidated<Infer<FormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance } = form;

	let open = $state(false);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const triggerId = useId();
</script>

<form method="POST" action="/?/combobox" class="space-y-6" use:enhance>
	<Form.Field {form} name="language" class="flex flex-col">
		<Popover.Root bind:open>
			<Form.Control id={triggerId}>
				{#snippet children({ props })}
					<Form.Label>Language</Form.Label>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-[200px] justify-between",
							!$formData.language && "text-muted-foreground"
						)}
						role="combobox"
						{...props}
					>
						{languages.find((f) => f.value === $formData.language)?.label ??
							"Select language"}
						<ChevronsUpDown class="opacity-50" />
					</Popover.Trigger>
					<input hidden value={$formData.language} name={props.name} />
				{/snippet}
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Search language..." class="h-9" />
					<Command.Empty>No language found.</Command.Empty>
					<Command.Group>
						{#each languages as language}
							<Command.Item
								value={language.value}
								onSelect={() => {
									$formData.language = language.value;
									closeAndFocusTrigger(triggerId);
								}}
							>
								{language.label}
								<Check
									class={cn(
										language.value !== $formData.language && "text-transparent"
									)}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Form.Description>
			This is the language that will be used in the dashboard.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
