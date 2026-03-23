<script lang="ts">
	import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import Clock2Icon from "@lucide/svelte/icons/clock-2";

	let value = $state<DateValue | undefined>(
		today(getLocalTimeZone()).set({ day: 12 })
	);
</script>

<Card.Root size="sm" class="mx-auto w-fit">
	<Card.Content>
		<Calendar type="single" bind:value class="p-0" />
	</Card.Content>
	<Card.Footer class="border-t bg-card">
		<Field.Group>
			<Field.Field>
				<Field.Label for="time-from">Start Time</Field.Label>
				<InputGroup.Root>
					<InputGroup.Input
						id="time-from"
						type="time"
						step="1"
						value="10:30:00"
						class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					/>
					<InputGroup.Addon>
						<Clock2Icon class="text-muted-foreground" />
					</InputGroup.Addon>
				</InputGroup.Root>
			</Field.Field>
			<Field.Field>
				<Field.Label for="time-to">End Time</Field.Label>
				<InputGroup.Root>
					<InputGroup.Input
						id="time-to"
						type="time"
						step="1"
						value="12:30:00"
						class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					/>
					<InputGroup.Addon>
						<Clock2Icon class="text-muted-foreground" />
					</InputGroup.Addon>
				</InputGroup.Root>
			</Field.Field>
		</Field.Group>
	</Card.Footer>
</Card.Root>
