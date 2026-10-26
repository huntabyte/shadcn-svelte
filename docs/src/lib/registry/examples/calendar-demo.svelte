<script lang="ts">
	import { Calendar } from "#lib/registry/ui/calendar/index.js";
	import { getLocalTimeZone, today, type CalendarDate } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value class="rounded-lg border" captionLayout="dropdown" />
