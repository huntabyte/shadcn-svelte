<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs";
	import CalendarDemo from "@/registry/default/example/calendar-demo.svelte";
	import RangeCalendarDemo from "@/registry/default/example/range-calendar-demo.svelte";
	import NYCalendarDemo from "@/registry/new-york/example/calendar-demo.svelte";
	import NYRangeCalendarDemo from "@/registry/new-york/example/range-calendar-demo.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<CalendarDemo />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<RangeCalendarDemo />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<NYCalendarDemo />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<NYRangeCalendarDemo />
	</ComponentPreviewManual>
{/if}
