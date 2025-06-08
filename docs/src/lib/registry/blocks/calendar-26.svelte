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

	let openFrom = $state(false);
	let openTo = $state(false);
	let valueFrom = $state<CalendarDate | undefined>();
	let valueTo = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-6">
	<div class="flex gap-4">
		<div class="flex flex-1 flex-col gap-3">
			<Label for="{id}-date-from" class="px-1">Check-in</Label>
			<Popover.Root bind:open={openFrom}>
				<Popover.Trigger id="{id}-date-from">
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="w-full justify-between font-normal"
						>
							{valueFrom
								? valueFrom.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})
								: "Select date"}
							<ChevronDownIcon />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="start">
					<Calendar
						type="single"
						bind:value={valueFrom}
						captionLayout="dropdown"
						onValueChange={() => {
							openFrom = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="{id}-time-from" class="invisible px-1">From</Label>
			<Input
				type="time"
				id="{id}-time-from"
				step="1"
				value="10:30:00"
				class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
	</div>
	<div class="flex gap-4">
		<div class="flex flex-1 flex-col gap-3">
			<Label for="{id}-date-to" class="px-1">Check-out</Label>
			<Popover.Root bind:open={openTo}>
				<Popover.Trigger id="{id}-date-to">
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="w-full justify-between font-normal"
						>
							{valueTo
								? valueTo.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})
								: "Select date"}
							<ChevronDownIcon />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="start">
					<Calendar
						type="single"
						bind:value={valueTo}
						captionLayout="dropdown"
						onValueChange={() => {
							openTo = false;
						}}
						isDateDisabled={(date) => {
							return (valueFrom && date.compare(valueFrom) < 0) ?? false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="{id}-time-to" class="invisible px-1">To</Label>
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
