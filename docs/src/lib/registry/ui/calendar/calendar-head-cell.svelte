<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
	bind:ref
	class={cn(
		"flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none",
		className
	)}
	{...restProps}
/>
