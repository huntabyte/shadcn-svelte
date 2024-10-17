<script lang="ts">
	import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import * as Calendar from "$lib/registry/new-york/ui/calendar/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { cn } from "$lib/utils.js";

	let {
		value = $bindable(),
		placeholder = $bindable(),
		weekdayFormat = "short",
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> = $props();

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

	const defaultYear = $derived(
		placeholder ? { value: placeholder.year, label: String(placeholder.year) } : undefined
	);

	const defaultMonth = $derived(
		placeholder
			? {
					value: placeholder.month,
					label: monthFmt.format(placeholder.toDate(getLocalTimeZone())),
				}
			: undefined
	);

	const monthLabel = $derived(
		monthOptions.find((m) => m.value === defaultMonth?.value) ?? "Select a month"
	);
</script>

<CalendarPrimitive.Root
	bind:value
	bind:placeholder
	{weekdayFormat}
	class={cn("rounded-md border p-3", className)}
	{...restProps as any}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header>
			<Calendar.Heading class="flex w-full items-center justify-between gap-2">
				<Select.Root
					type="single"
					value={`${defaultMonth?.value}`}
					onValueChange={(v) => {
						if (!v || !placeholder) return;
						if (v === `${placeholder?.month}`) return;
						placeholder = placeholder.set({ month: Number.parseInt(v) });
					}}
				>
					<Select.Trigger aria-label="Select month" class="w-[60%]">
						{monthLabel}
					</Select.Trigger>
					<Select.Content class="max-h-[200px] overflow-y-auto">
						{#each monthOptions as { value, label }}
							<Select.Item value={`${value}`} {label} />
						{/each}
					</Select.Content>
				</Select.Root>
				<Select.Root
					type="single"
					value={`${defaultYear?.value}`}
					onValueChange={(v) => {
						if (!v || !placeholder) return;
						if (v === `${placeholder?.year}`) return;
						placeholder = placeholder.set({ year: Number.parseInt(v) });
					}}
				>
					<Select.Trigger aria-label="Select year" class="w-[40%]">
						{defaultYear?.label ?? "Select year"}
					</Select.Trigger>
					<Select.Content class="max-h-[200px] overflow-y-auto">
						{#each yearOptions as { value, label }}
							<Select.Item value={`${value}`} {label} />
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
							<Calendar.GridRow class="mt-2 w-full">
								{#each weekDates as date}
									<Calendar.Cell {date} month={month.value}>
										<Calendar.Day />
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
