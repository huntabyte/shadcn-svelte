<script lang="ts">
	import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import * as Calendar from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> = $props();
</script>

<CalendarPrimitive.Root
	bind:ref
	bind:value={value as never}
	bind:placeholder={placeholder as never}
	{weekdayFormat}
	class={cn("p-3", className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header>
			<Calendar.PrevButton />
			<Calendar.Heading />
			<Calendar.NextButton />
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
