<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { CalendarDate, getLocalTimeZone, type DateValue } from "@internationalized/date";
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

	function isValidDate(date: Date | undefined): date is Date {
		if (!date) return false;
		return !isNaN(date.getTime());
	}

	let open = $state(false);
	let value = $state<DateValue | undefined>(new CalendarDate(2025, 6, 1));
	let month = $state<DateValue | undefined>(untrack(() => value));
	let inputValue = $state(untrack(() => formatDate(value)));
</script>

<Field.Field class="mx-auto w-48">
	<Field.Label for="date-required">Subscription Date</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input
			id="date-required"
			placeholder="June 01, 2025"
			bind:value={
				() => inputValue,
				(v) => {
					inputValue = v;
					const date = new Date(v);
					if (isValidDate(date)) {
						value = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
						month = value;
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
				<Popover.Content
					class="w-auto overflow-hidden p-0"
					align="end"
					alignOffset={-8}
					sideOffset={10}
				>
					<Calendar
						type="single"
						bind:value
						bind:placeholder={month}
						onValueChange={(v) => {
							inputValue = formatDate(v);
							open = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</InputGroup.Addon>
	</InputGroup.Root>
</Field.Field>
