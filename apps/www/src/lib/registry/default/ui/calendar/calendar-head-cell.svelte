<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = CalendarPrimitive.HeadCellProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.HeadCell
	class={cn("text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", className)}
	{...$$restProps}
>
	<slot />
</CalendarPrimitive.HeadCell>
