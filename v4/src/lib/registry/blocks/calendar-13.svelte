<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { CalendarDate, isWeekend } from "@internationalized/date";
	import type { ComponentProps } from "svelte";

	let value = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
	let dropdown = $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

	const dropdownOptions = [
		{
			label: "Month and Year",
			value: "dropdown",
		},
		{
			label: "Month Only",
			value: "dropdown-months",
		},
		{
			label: "Year Only",
			value: "dropdown-years",
		},
	];

	const selectedDropdown = $derived(
		dropdownOptions.find((option) => option.value === dropdown)?.label ?? "Dropdown"
	);
</script>

<div class="flex flex-col gap-4">
	<Calendar
		type="single"
		bind:value
		isDateDisabled={(date) => isWeekend(date, "en-US")}
		class="rounded-lg border shadow-sm"
		captionLayout={dropdown}
	/>
	<div class="flex flex-col gap-3">
		<Label for="dropdown" class="px-1">Dropdown</Label>
		<Select.Root type="single" bind:value={dropdown}>
			<Select.Trigger id="dropdown" size="sm" class="bg-background w-full">
				{selectedDropdown}
			</Select.Trigger>
			<Select.Content align="center">
				{#each dropdownOptions as option (option.value)}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
</div>
