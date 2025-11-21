<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
	let selectedTime = $state<string | null>("10:00");

	const bookedDates = Array.from({ length: 3 }, (_, i) => new CalendarDate(2025, 6, 17 + i));
	const timeSlots = Array.from({ length: 37 }, (_, i) => {
		const totalMinutes = i * 15;
		const hour = Math.floor(totalMinutes / 60) + 9;
		const minute = totalMinutes % 60;
		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
	});
</script>

<Card.Root class="gap-0 p-0">
	<Card.Content class="relative p-0 md:pe-48">
		<div class="p-6">
			<Calendar
				type="single"
				bind:value
				isDateUnavailable={(date) => bookedDates.some((d) => d.compare(date) === 0)}
				class="data-unavailable:line-through data-unavailable:opacity-100 bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)] [&_[data-outside-month]]:hidden"
				weekdayFormat="short"
			/>
		</div>
		<div
			class="no-scrollbar inset-y-0 end-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-s md:border-t-0"
		>
			<div class="grid gap-2">
				{#each timeSlots as time (time)}
					<Button
						variant={selectedTime === time ? "default" : "outline"}
						onclick={() => (selectedTime = time)}
						class="w-full shadow-none"
					>
						{time}
					</Button>
				{/each}
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-col gap-4 border-t !py-5 px-6 md:flex-row">
		<div class="text-sm">
			{#if value && selectedTime}
				Your meeting is booked for
				<span class="font-medium">
					{value.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
						weekday: "long",
						day: "numeric",
						month: "short",
					})}
				</span>
				at <span class="font-medium">{selectedTime}</span>.
			{:else}
				Select a date and time for your meeting.
			{/if}
		</div>
		<Button
			disabled={!value || !selectedTime}
			class="w-full md:ms-auto md:w-auto"
			variant="outline"
		>
			Continue
		</Button>
	</Card.Footer>
</Card.Root>
