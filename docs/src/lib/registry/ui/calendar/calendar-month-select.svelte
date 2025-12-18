<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		ref = $bindable(null),
		class: className,
		value,
		onchange,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> = $props();
</script>

<span
	class={cn(
		"cn-calendar-dropdown-root relative rounded-(--cell-radius)",
		className
	)}
>
	<CalendarPrimitive.MonthSelect bind:ref class="cn-calendar-dropdown absolute bg-popover inset-0 opacity-0" {...restProps}>
		{#snippet child({ props, monthItems, selectedMonthItem })}
			<select {...props} {value} {onchange}>
				{#each monthItems as monthItem (monthItem.value)}
					<option
						value={monthItem.value}
						selected={value !== undefined
							? monthItem.value === value
							: monthItem.value === selectedMonthItem.value}
					>
						{monthItem.label}
					</option>
				{/each}
			</select>
			<span
				class="cn-calendar-dropdowns w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5 [&>svg]:text-muted-foreground select-none [&>svg]:size-3.5"
				aria-hidden="true"
			>
				{monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label}
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDownIcon"
					phosphor="CaretDownIcon"
					class="size-4"
				/>
			</span>
		{/snippet}
	</CalendarPrimitive.MonthSelect>
</span>
