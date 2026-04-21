<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import {
		DateFormatter,
		parseDate,
		type DateValue,
		getLocalTimeZone,
	} from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	function formatDate(date: DateValue | undefined): string {
		if (!date) return "";
		return df.format(date.toDate(getLocalTimeZone()));
	}

	const initialDate = parseDate("2025-06-01");

	let open = $state(false);
	let value = $state<DateValue | undefined>(initialDate);
	let month = $state<DateValue | undefined>(initialDate);
	let inputValue = $state(formatDate(initialDate));

	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		inputValue = target.value;
		try {
			const parsed = parseDate(target.value);
			if (parsed) {
				value = parsed;
				month = parsed;
			}
		} catch {
			// ignore parse errors while typing
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			open = true;
		}
	}
</script>

<Field.Field class="mx-auto w-48">
	<Field.Label for="date-input">Subscription Date</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input
			id="date-input"
			value={inputValue}
			placeholder="June 01, 2025"
			oninput={handleInputChange}
			onkeydown={handleKeyDown}
		/>
		<InputGroup.Addon align="inline-end">
			<Popover.Root bind:open>
				<Popover.Trigger>
					{#snippet child({ props })}
						<InputGroup.Button
							{...props}
							variant="ghost"
							size="icon-xs"
							aria-label="Select date"
						>
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
							month = v;
							open = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</InputGroup.Addon>
	</InputGroup.Root>
</Field.Field>
