<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { BarChart, Highlight, type ChartContextValue } from "layerchart";
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import type { DateRange } from "bits-ui";
	import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
	import { scaleBand } from "d3-scale";
	import { cubicInOut } from "svelte/easing";

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2025, 6, 5),
		end: new CalendarDate(2025, 6, 20),
	});

	const chartData = [
		{ date: new Date("2025-06-01"), visitors: 178 },
		{ date: new Date("2025-06-02"), visitors: 470 },
		{ date: new Date("2025-06-03"), visitors: 103 },
		{ date: new Date("2025-06-04"), visitors: 439 },
		{ date: new Date("2025-06-05"), visitors: 88 },
		{ date: new Date("2025-06-06"), visitors: 294 },
		{ date: new Date("2025-06-07"), visitors: 323 },
		{ date: new Date("2025-06-08"), visitors: 385 },
		{ date: new Date("2025-06-09"), visitors: 438 },
		{ date: new Date("2025-06-10"), visitors: 155 },
		{ date: new Date("2025-06-11"), visitors: 92 },
		{ date: new Date("2025-06-12"), visitors: 492 },
		{ date: new Date("2025-06-13"), visitors: 81 },
		{ date: new Date("2025-06-14"), visitors: 426 },
		{ date: new Date("2025-06-15"), visitors: 307 },
		{ date: new Date("2025-06-16"), visitors: 371 },
		{ date: new Date("2025-06-17"), visitors: 475 },
		{ date: new Date("2025-06-18"), visitors: 107 },
		{ date: new Date("2025-06-19"), visitors: 341 },
		{ date: new Date("2025-06-20"), visitors: 408 },
		{ date: new Date("2025-06-21"), visitors: 169 },
		{ date: new Date("2025-06-22"), visitors: 317 },
		{ date: new Date("2025-06-23"), visitors: 480 },
		{ date: new Date("2025-06-24"), visitors: 132 },
		{ date: new Date("2025-06-25"), visitors: 141 },
		{ date: new Date("2025-06-26"), visitors: 434 },
		{ date: new Date("2025-06-27"), visitors: 448 },
		{ date: new Date("2025-06-28"), visitors: 149 },
		{ date: new Date("2025-06-29"), visitors: 103 },
		{ date: new Date("2025-06-30"), visitors: 446 },
	];

	const total = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

	const chartConfig = {
		visitors: {
			label: "Visitors",
			color: "var(--color-primary)",
		},
	} satisfies Chart.ChartConfig;

	const filteredData = $derived.by(() => {
		if (!value?.start || !value?.end) return chartData;
		return chartData.filter(({ date }) => {
			const dateObj = new Date(date);
			if (!value) return true;
			const startDate = value.start!.toDate(getLocalTimeZone());
			const endDate = value.end!.toDate(getLocalTimeZone());
			// set end date to end of day to include the full day
			endDate.setHours(23, 59, 59, 999);
			return dateObj >= startDate && dateObj <= endDate;
		});
	});

	let context = $state<ChartContextValue>();
</script>

<Card.Root class="@container/card w-full max-w-xl">
	<Card.Header class="flex flex-col border-b @md/card:grid">
		<Card.Title>Web Analytics</Card.Title>
		<Card.Description>Showing total visitors for this month.</Card.Description>
		<Card.Action class="mt-2 @md/card:mt-0">
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline">
							<CalendarIcon />
							{value?.start && value?.end
								? `${value.start.toDate(getLocalTimeZone()).toLocaleDateString()} - ${value.end.toDate(getLocalTimeZone()).toLocaleDateString()}`
								: "June 2025"}
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="end">
					<RangeCalendar
						class="w-full"
						fixedWeeks
						bind:value
						minValue={new CalendarDate(2025, 6, 1)}
						maxValue={new CalendarDate(2025, 6, 31)}
					/>
				</Popover.Content>
			</Popover.Root>
		</Card.Action>
	</Card.Header>
	<Card.Content class="px-4">
		<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
			<BarChart
				bind:context
				data={filteredData}
				xScale={scaleBand().padding(0.25)}
				x="date"
				axis="x"
				y="visitors"
				props={{
					bars: {
						stroke: "none",
						rounded: "all",
						radius: 4,
						// use the height of the chart to animate the bars
						initialY: context?.height,
						initialHeight: 0,
						motion: {
							x: { type: "tween", duration: 500, easing: cubicInOut },
							width: { type: "tween", duration: 500, easing: cubicInOut },
							height: { type: "tween", duration: 500, easing: cubicInOut },
							y: { type: "tween", duration: 500, easing: cubicInOut },
						},
					},
					xAxis: { format: (d) => d.toLocaleDateString("en-US", { day: "numeric" }) },
				}}
			>
				{#snippet belowMarks()}
					<Highlight area={{ class: "fill-muted" }} />
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						class="w-[150px]"
						nameKey="visitors"
						labelFormatter={(d) =>
							d.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
					/>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="border-t">
		<div class="text-sm">
			You had
			<span class="font-semibold">{total.toLocaleString()}</span>
			visitors for the month of June.
		</div>
	</Card.Footer>
</Card.Root>
