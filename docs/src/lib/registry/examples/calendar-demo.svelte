<script lang="ts">
	import { getLocalTimeZone, today, type CalendarDate } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	let value = $state<CalendarDate | undefined>(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value class="rounded-lg border" captionLayout="dropdown" />
