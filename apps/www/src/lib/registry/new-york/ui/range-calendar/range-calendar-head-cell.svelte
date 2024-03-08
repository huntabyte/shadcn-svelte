<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = RangeCalendarPrimitive.HeadCellProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.HeadCell
	class={cn("w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</RangeCalendarPrimitive.HeadCell>
