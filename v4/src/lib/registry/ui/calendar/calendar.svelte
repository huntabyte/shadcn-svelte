<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import * as Calendar from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "../button/button.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
		buttonVariant = "ghost",
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
	} = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	class={cn(
		"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
		className
	)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header>
			<Calendar.PrevButton variant={buttonVariant} />
			<Calendar.Heading />
			<Calendar.NextButton variant={buttonVariant} />
		</Calendar.Header>
		<Calendar.Months>
			{#each months as month (month)}
				<Calendar.Grid>
					<Calendar.GridHead>
						<Calendar.GridRow class="flex select-none">
							{#each weekdays as weekday (weekday)}
								<Calendar.HeadCell>
									{weekday.slice(0, 2)}
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<Calendar.GridRow class="mt-2 w-full">
								{#each weekDates as date (date)}
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
