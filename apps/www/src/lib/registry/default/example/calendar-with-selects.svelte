<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import * as Calendar from "@/registry/default/ui/calendar";
	import * as Select from "@/registry/default/ui/select";
	import { cn } from "$lib/utils";
	import { DateFormatter, getLocalTimeZone, today } from "@internationalized/date";

	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props["value"] = undefined;
	export let placeholder: $$Props["placeholder"] = today(getLocalTimeZone());
	export let weekdayFormat: $$Props["weekdayFormat"] = "short";

	const monthOptions = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	].map((month, i) => ({ value: i + 1, label: month }));

	const monthFmt = new DateFormatter("en-US", {
		month: "long",
	});

	const yearOptions = Array.from({ length: 100 }, (_, i) => ({
		label: String(new Date().getFullYear() - i),
		value: new Date().getFullYear() - i,
	}));

	$: defaultYear = placeholder
		? {
				value: placeholder.year,
				label: String(placeholder.year),
		  }
		: undefined;

	$: defaultMonth = placeholder
		? {
				value: placeholder.month,
				label: monthFmt.format(placeholder.toDate(getLocalTimeZone())),
		  }
		: undefined;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Root
	{weekdayFormat}
	class={cn("p-3 rounded-md border", className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
	bind:value
	bind:placeholder
>
	<Calendar.Header>
		<Calendar.Heading class="flex items-center justify-between w-full gap-2">
			<Select.Root
				selected={defaultMonth}
				items={monthOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.month) return;
					placeholder = placeholder.set({ month: v.value });
				}}
			>
				<Select.Trigger aria-label="Select month" class="w-[60%]">
					<Select.Value placeholder="Select month" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each monthOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root
				selected={defaultYear}
				items={yearOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.year) return;
					placeholder = placeholder.set({ year: v.value });
				}}
			>
				<Select.Trigger aria-label="Select year" class="w-[40%]">
					<Select.Value placeholder="Select year" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each yearOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Calendar.Heading>
	</Calendar.Header>
	<Calendar.Months>
		{#each months as month}
			<Calendar.Grid>
				<Calendar.GridHead>
					<Calendar.GridRow class="flex">
						{#each weekdays as weekday}
							<Calendar.HeadCell>
								{weekday.slice(0, 2)}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as weekDates}
						<Calendar.GridRow class="w-full mt-2">
							{#each weekDates as date}
								<Calendar.Cell {date}>
									<Calendar.Day {date} month={month.value} />
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	</Calendar.Months>
</CalendarPrimitive.Root>
