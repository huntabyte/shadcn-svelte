<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
	bind:ref
	class={cn(
		"cn-calendar-month-caption flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
		className
	)}
	{...restProps}
/>
