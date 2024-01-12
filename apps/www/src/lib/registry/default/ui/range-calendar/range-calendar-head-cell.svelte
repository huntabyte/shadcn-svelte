<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = RangeCalendarPrimitive.HeadCellProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.HeadCell
	class={cn("text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", className)}
	{...$$restProps}
>
	<slot />
</RangeCalendarPrimitive.HeadCell>
