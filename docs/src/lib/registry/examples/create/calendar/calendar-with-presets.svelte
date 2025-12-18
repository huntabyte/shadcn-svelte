<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

	const currentDate = today(getLocalTimeZone());
	let date = $state<CalendarDate | undefined>(
		new CalendarDate(currentDate.year, 1, 12)
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let currentMonth = $state<CalendarDate>(
		new CalendarDate(currentDate.year, currentDate.month, 1)
	);

	const presets = [
		{ label: "Today", value: 0 },
		{ label: "Tomorrow", value: 1 },
		{ label: "In 3 days", value: 3 },
		{ label: "In a week", value: 7 },
		{ label: "In 2 weeks", value: 14 },
	];
</script>

<Example title="With Presets">
	<Card.Root class="mx-auto w-fit max-w-[300px]" size="sm">
		<Card.Content>
			<Calendar
				type="single"
				bind:value={date}
				fixedWeeks
				class="p-0 [--cell-size:--spacing(9.5)]"
			/>
		</Card.Content>
		<Card.Footer class="flex flex-wrap gap-2 border-t">
			{#each presets as preset (preset.value)}
				<Button
					variant="outline"
					size="sm"
					class="flex-1"
					onclick={() => {
						const newDate = currentDate.add({ days: preset.value });
						date = newDate;
						currentMonth = new CalendarDate(newDate.year, newDate.month, 1);
					}}
				>
					{preset.label}
				</Button>
			{/each}
		</Card.Footer>
	</Card.Root>
</Example>
