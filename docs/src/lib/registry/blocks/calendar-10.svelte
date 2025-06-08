<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Appointment</Card.Title>
		<Card.Description>Find a date.</Card.Description>
		<Card.Action>
			<Button size="sm" variant="outline" onclick={() => (value = today(getLocalTimeZone()))}>
				Today
			</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<Calendar type="single" bind:value class="bg-transparent p-0" />
	</Card.Content>
</Card.Root>
