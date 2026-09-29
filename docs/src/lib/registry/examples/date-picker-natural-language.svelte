<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { CalendarDate, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { parseDate } from "chrono-node";
	import { untrack } from "svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	function formatDate(date: DateValue | undefined) {
		if (!date) return "";

		return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	}

	function toCalendarDate(date: Date) {
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}

	let open = $state(false);
	let inputValue = $state("In 2 days");
	let value = $state<DateValue | undefined>(
		untrack(() => {
			const date = parseDate(inputValue);
			return date ? toCalendarDate(date) : undefined;
		})
	);
</script>

<Field.Field class="mx-auto max-w-xs">
	<Field.Label for="date-optional">Schedule Date</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input
			id="date-optional"
			placeholder="Tomorrow or next week"
			bind:value={
				() => inputValue,
				(v) => {
					inputValue = v;
					const date = parseDate(v);
					if (date) {
						value = toCalendarDate(date);
					}
				}
			}
			onkeydown={(e) => {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					open = true;
				}
			}}
		/>
		<InputGroup.Addon align="inline-end">
			<Popover.Root bind:open>
				<Popover.Trigger id="date-picker">
					{#snippet child({ props })}
						<InputGroup.Button {...props} variant="ghost" size="icon-xs" aria-label="Select date">
							<CalendarIcon />
							<span class="sr-only">Select date</span>
						</InputGroup.Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
					<Calendar
						type="single"
						bind:value
						captionLayout="dropdown"
						onValueChange={(v) => {
							inputValue = formatDate(v);
							open = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</InputGroup.Addon>
	</InputGroup.Root>
	<div class="px-1 text-sm text-muted-foreground">
		Your post will be published on
		<span class="font-medium">{formatDate(value)}</span>.
	</div>
</Field.Field>
