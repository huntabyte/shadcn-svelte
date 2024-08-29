<script lang="ts" context="module">
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

	export const accountFormSchema = z.object({
		name: z
			.string({
				required_error: "Required.",
			})
			.min(2, "Name must be at least 2 characters.")
			.max(30, "Name must not be longer than 30 characters"),
		// Hack: https://github.com/colinhacks/zod/issues/2280
		language: z.enum(languages.map((lang) => lang.value) as [Language, ...Language[]]),
		dob: z
			.string()
			.datetime({ message: "" })
			// we're setting it optional so the user can clear the date and we don't run into
			// type issues, but we refine it to make sure it's not undefined
			.optional()
			.refine((date) => date !== "", "Please select a valid date."),
	});

	export type AccountFormSchema = typeof accountFormSchema;
</script>

<script lang="ts">
	import CalendarIcon from "svelte-radix/Calendar.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import Check from "svelte-radix/Check.svelte";
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
	} from "@internationalized/date";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import { Calendar } from "$lib/registry/new-york/ui/calendar/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<AccountFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(accountFormSchema),
	});
	const { form: formData, enhance, validate } = form;

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let dobValue: DateValue | undefined = $formData.dob ? parseDate($formData.dob) : undefined;
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field name="name" {form}>
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Date of Birth</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[240px] justify-start text-left font-normal",
						!dobValue && "text-muted-foreground"
					)}
					{...attrs}
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					{dobValue ? df.format(dobValue.toDate(getLocalTimeZone())) : "Pick a date"}
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="start">
					<Calendar
						bind:value={dobValue}
						isDateDisabled={(currDate) => {
							const currDateObj = currDate.toDate(getLocalTimeZone());
							const today = new Date();
							today.setHours(0, 0, 0, 0);

							if (currDateObj > today || currDate.year < 1900) return true;

							return false;
						}}
						onValueChange={(value) => {
							if (value === undefined) {
								$formData.dob = "";
								validate("dob");
								return;
							}
							$formData.dob = value.toDate("UTC").toISOString();
							validate("dob");
						}}
					/>
				</Popover.Content>
				<input hidden bind:value={$formData.dob} name={attrs.name} />
			</Popover.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="language" class="flex flex-col">
		<Popover.Root>
			<Form.Control let:attrs>
				<Form.Label>Language</Form.Label>
				<Popover.Trigger
					role="combobox"
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[200px] justify-between",
						!$formData.language && "text-muted-foreground"
					)}
					{...attrs}
				>
					{languages.find((lang) => lang.value === $formData.language)?.label ||
						"Select a language"}
					<CaretSort class="ml-2 size-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$formData.language} name={attrs.name} />
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search language..." />
					<Command.Empty>No language found.</Command.Empty>
					<Command.List>
						{#each languages as language}
							<Command.Item
								{...form}
								value={language.label}
								onSelect={() => {
									$formData.language = language.value;
									validate("language");
								}}
							>
								<Check
									class={cn(
										"mr-2 size-4",
										language.value === $formData.language
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{language.label}
							</Command.Item>
						{/each}
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</Form.Field>

	<Form.Button>Update account</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
