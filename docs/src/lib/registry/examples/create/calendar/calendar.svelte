<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import CalendarSingle from "./calendar-single.svelte";
	import CalendarMultiple from "./calendar-multiple.svelte";
	import CalendarWeekNumbers from "./calendar-week-numbers.svelte";
	import CalendarBookedDates from "./calendar-booked-dates.svelte";
	import CalendarRange from "./calendar-range.svelte";
	import CalendarRangeMultipleMonths from "./calendar-range-multiple-months.svelte";
	import CalendarWithTime from "./calendar-with-time.svelte";
	import CalendarWithPresets from "./calendar-with-presets.svelte";
	import DatePickerSimple from "./date-picker-simple.svelte";
	import DataPickerWithDropdowns from "./date-picker-with-dropdowns.svelte";
	import DatePickerWithRange from "./date-picker-with-range.svelte";
</script>

<ExampleWrapper>
	<CalendarSingle />
	<CalendarMultiple />
	<CalendarWeekNumbers />
	<CalendarBookedDates />
	<CalendarRange />
	<CalendarRangeMultipleMonths />
	<CalendarWithTime />
	<CalendarWithPresets />
	<DatePickerSimple />
	<DataPickerWithDropdowns />
	<DatePickerWithRange />
</ExampleWrapper>
