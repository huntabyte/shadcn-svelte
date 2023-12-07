<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { DoubleArrowLeft, DoubleArrowRight } from "radix-icons-svelte";
	import * as Calendar from "@/registry/new-york/ui/calendar";
	import { Button } from "@/registry/new-york/ui/button";
	import { cn } from "$lib/utils";

	type $$Props = CalendarPrimitive.Props;
	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props["value"] = undefined;
	export let placeholder: $$Props["placeholder"] = undefined;
	export let weekdayFormat: $$Props["weekdayFormat"] = "short";

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Root
	bind:value
	bind:placeholder
	{weekdayFormat}
	class={cn("p-3 rounded-md border", className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
>
	<Calendar.Header class="gap-1">
		<div>
			<Button
				variant="outline"
				class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
			>
				<DoubleArrowLeft class="h-4 w-4" />
			</Button>
			<Calendar.PrevButton />
		</div>
		<Calendar.Heading class="text-[13px]" />
		<div>
			<Calendar.NextButton />
			<Button
				variant="outline"
				class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
			>
				<DoubleArrowRight class="h-4 w-4" />
			</Button>
		</div>
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
