<script lang="ts">
	import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const presets = [
		{ label: "Today", days: 0 },
		{ label: "Tomorrow", days: 1 },
		{ label: "In 3 days", days: 3 },
		{ label: "In a week", days: 7 },
		{ label: "In 2 weeks", days: 14 },
	];

	const initialDate = today(getLocalTimeZone()).set({ month: 2, day: 12 });
	let value = $state<DateValue | undefined>(initialDate);
	let placeholder = $state<DateValue | undefined>(initialDate);
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
		{#each presets as preset (preset.days)}
			<Button
				variant="outline"
				size="sm"
				class="flex-1"
				onclick={() => {
					const newDate = today(getLocalTimeZone()).add({ days: preset.days });
					value = newDate;
					placeholder = newDate;
				}}
			>
				{preset.label}
			</Button>
		{/each}
	</Card.Footer>
</Card.Root>
