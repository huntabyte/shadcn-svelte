<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { getLocalTimeZone } from "@internationalized/date";
	import type { CalendarDate } from "@internationalized/date";

	const id = $props.id();

	let open = $state(false);
	let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col gap-3">
		<Label for="{id}-date" class="px-1">Date</Label>
		<Popover.Root bind:open>
			<Popover.Trigger id="{id}-date">
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="w-full justify-between font-normal">
						{value
							? value.toDate(getLocalTimeZone()).toLocaleDateString()
							: "Select date"}
						<ChevronDownIcon />
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
	</div>
	<div class="flex gap-4">
		<div class="flex flex-col gap-3">
			<Label for="{id}-time-from" class="px-1">From</Label>
			<Input
				type="time"
				id="{id}-time-from"
				step="1"
				value="10:30:00"
				class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="{id}-time-to" class="px-1">To</Label>
			<Input
				type="time"
				id="{id}-time-to"
				step="1"
				value="12:30:00"
				class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
	</div>
</div>
