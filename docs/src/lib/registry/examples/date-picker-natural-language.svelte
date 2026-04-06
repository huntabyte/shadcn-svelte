<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import {
		parseDate as parseISODate,
		type DateValue,
		getLocalTimeZone,
	} from "@internationalized/date";
	import { parseDate as chronoParse } from "chrono-node";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { DateFormatter } from "@internationalized/date";

	const df = new DateFormatter("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	function formatDateValue(date: DateValue | undefined): string {
		if (!date) return "";
		return df.format(date.toDate(getLocalTimeZone()));
	}

	function chronoToDateValue(date: Date | null): DateValue | undefined {
		if (!date) return undefined;
		const iso = date.toISOString().split("T")[0];
		try {
			return parseISODate(iso);
		} catch {
			return undefined;
		}
	}

	const initialText = "In 2 days";
	let open = $state(false);
	let inputValue = $state(initialText);
	let value = $state<DateValue | undefined>(chronoToDateValue(chronoParse(initialText)));

	function handleInput(e: Event) {
		const text = (e.target as HTMLInputElement).value;
		inputValue = text;
		const parsed = chronoParse(text);
		if (parsed) {
			value = chronoToDateValue(parsed);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			open = true;
		}
	}
</script>

<Field.Field class="mx-auto max-w-xs">
	<Field.Label for="date-natural-language">Schedule Date</Field.Label>
	<InputGroup.Root>
		<InputGroup.Input
			id="date-natural-language"
			value={inputValue}
			placeholder="Tomorrow or next week"
			oninput={handleInput}
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
				<Popover.Content class="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
					<Calendar
						type="single"
						captionLayout="dropdown"
						bind:value
						onValueChange={(v) => {
							inputValue = formatDateValue(v);
							open = false;
						}}
					/>
				</Popover.Content>
			</Popover.Root>
		</InputGroup.Addon>
	</InputGroup.Root>
	<div class="px-1 text-sm text-muted-foreground">
		Your post will be published on
		<span class="font-medium">{formatDateValue(value)}</span>.
	</div>
</Field.Field>
