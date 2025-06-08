<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { CalendarDate } from "@internationalized/date";
	import RangeCalendar from "../ui/range-calendar/range-calendar.svelte";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2025, 9, 9),
		end: new CalendarDate(2025, 9, 17),
	});

	const localizedStrings = {
		en: {
			title: "Book an appointment",
			description: "Select the dates for your appointment",
		},
		es: {
			title: "Reserva una cita",
			description: "Selecciona las fechas para tu cita",
		},
	} as const;

	let locale = $state<keyof typeof localizedStrings>("es");

	const languageOptions = [
		{
			label: "English",
			value: "en",
		},
		{
			label: "Español",
			value: "es",
		},
	];

	const selectedLanguage = $derived(
		languageOptions.find((option) => option.value === locale)?.label ?? "Language"
	);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{localizedStrings[locale].title}</Card.Title>
		<Card.Description>{localizedStrings[locale].description}</Card.Description>
		<Card.Action>
			<Select.Root type="single" bind:value={locale}>
				<Select.Trigger class="w-[100px]" aria-label="Select language">
					{selectedLanguage}
				</Select.Trigger>
				<Select.Content align="end">
					{#each languageOptions as option (option.value)}
						<Select.Item value={option.value}>{option.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<RangeCalendar
			bind:value
			numberOfMonths={2}
			{locale}
			class="bg-transparent p-0"
			buttonVariant="outline"
		/>
	</Card.Content>
</Card.Root>
