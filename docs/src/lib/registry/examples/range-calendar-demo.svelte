<script lang="ts">
	import { RangeCalendar } from "#lib/registry/ui/range-calendar/index.js";
	import { getLocalTimeZone, today } from "@internationalized/date";

	const start = today(getLocalTimeZone());
	const end = start.add({ days: 7 });

	let value = $state({
		start,
		end,
	});
</script>

<RangeCalendar bind:value class="rounded-md border" />
