<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	const presets = [
		{ label: "Today", value: 0 },
		{ label: "Tomorrow", value: 1 },
		{ label: "In 3 days", value: 3 },
		{ label: "In a week", value: 7 },
		{ label: "In 2 weeks", value: 14 },
	];

	let value = $state<CalendarDate | undefined>(
		new CalendarDate(today(getLocalTimeZone()).year, 2, 12)
	);
	let placeholder = $state<CalendarDate>(today(getLocalTimeZone()));
</script>

<Card.Root class="mx-auto w-fit max-w-[300px]" size="sm">
	<Card.Content>
		<Calendar
			type="single"
			bind:value
			bind:placeholder
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
					const newDate = today(getLocalTimeZone()).add({ days: preset.value });
					value = newDate;
					placeholder = newDate;
				}}
			>
				{preset.label}
			</Button>
		{/each}
	</Card.Footer>
</Card.Root>
