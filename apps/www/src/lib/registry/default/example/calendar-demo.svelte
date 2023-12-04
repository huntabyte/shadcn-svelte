<script lang="ts">
	import { cn } from "@/utils";
	import { Calendar } from "bits-ui";
	import { buttonVariants } from "@/registry/default/ui/button";
	import { ChevronLeft, ChevronRight } from "lucide-svelte";

	export let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Calendar.Root
	let:months
	let:weekdays
	weekdayFormat="short"
	class={cn("p-3", className)}
>
	<Calendar.Header
		class="flex justify-between pt-1 relative items-center w-full"
	>
		<Calendar.PrevButton
			class={cn(
				buttonVariants({ variant: "outline" }),
				"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
			)}
		>
			<ChevronLeft class="h-4 w-4" />
		</Calendar.PrevButton>
		<Calendar.Heading class="text-sm font-medium" />
		<Calendar.NextButton
			class={cn(
				buttonVariants({ variant: "outline" }),
				"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
			)}
		>
			<ChevronRight class="h-4 w-4" />
			<!--  -->
		</Calendar.NextButton>
	</Calendar.Header>
	<div
		class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 mt-4"
	>
		{#each months as month}
			<Calendar.Grid class="w-full border-collapse space-y-1">
				<Calendar.GridHead>
					<Calendar.GridRow class="flex">
						{#each weekdays as weekday}
							<Calendar.HeadCell
								class="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
							>
								{weekday.slice(0, 2)}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				{#each month.weeks as weekDates}
					<Calendar.GridRow class="flex w-full mt-2">
						{#each weekDates as date}
							<Calendar.Cell
								{date}
								class="h-9 w-9 text-center text-sm p-0 relative [&:has([data-selected].day-range-end)]:rounded-r-md [&:has([data-selected].day-outside)]:bg-accent/50 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
							>
								<Calendar.Date
									{date}
									month={month.value}
									class={cn(
										buttonVariants({ variant: "ghost" }),
										"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
										"data-[today]:bg-accent data-[today]:text-accent-foreground",
										//
										"data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
										//
										"data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",
										//
										"data-[disabled]:text-muted-foreground data-[disabled]:opacity-50"
									)}
								/>
							</Calendar.Cell>
						{/each}
					</Calendar.GridRow>
				{/each}
			</Calendar.Grid>
		{/each}
	</div>
</Calendar.Root>
