<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { cn } from "$lib/utils.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	let open = $state(false);
	let value = $state<DateValue | undefined>();
</script>

<div class="mx-auto flex max-w-xs flex-row gap-4">
	<Field.Field>
		<Field.Label for="date-picker-time-date">Date</Field.Label>
		<Popover.Root bind:open>
			<Popover.Trigger
				id="date-picker-time-date"
				class={cn(
					buttonVariants({ variant: "outline" }),
					"w-32 justify-between font-normal",
					!value && "text-muted-foreground"
				)}
			>
				{value ? df.format(value.toDate(getLocalTimeZone())) : "Select date"}
				<ChevronDownIcon />
			</Popover.Trigger>
			<Popover.Content class="w-auto overflow-hidden p-0" align="start">
				<Calendar
					type="single"
					captionLayout="dropdown"
					bind:value
					onValueChange={() => {
						open = false;
					}}
				/>
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
	<Field.Field class="w-32">
		<Field.Label for="date-picker-time-time">Time</Field.Label>
		<Input
			type="time"
			id="date-picker-time-time"
			step="1"
			value="10:30:00"
			class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
		/>
	</Field.Field>
</div>
