<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let open = $state(false);
	let value = $state<DateValue | undefined>();
</script>

<Field.Group class="mx-auto max-w-xs flex-row">
	<Field.Field>
		<Field.Label for="date-picker-optional">Date</Field.Label>
		<Popover.Root bind:open>
			<Popover.Trigger id="date-picker-optional">
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="w-32 justify-between font-normal">
						{value ? df.format(value.toDate(getLocalTimeZone())) : "Select date"}
						<ChevronDownIcon data-icon="inline-end" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto overflow-hidden p-0" align="start">
				<Calendar
					type="single"
					bind:value
					captionLayout="dropdown"
					onValueChange={() => {
						open = false;
					}}
				/>
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
	<Field.Field class="w-32">
		<Field.Label for="time-picker-optional">Time</Field.Label>
		<Input
			type="time"
			id="time-picker-optional"
			step="1"
			value="10:30:00"
			class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
		/>
	</Field.Field>
</Field.Group>
