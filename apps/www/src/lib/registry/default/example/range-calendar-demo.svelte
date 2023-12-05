<script lang="ts">
	import { RangeCalendar } from "@/registry/default/ui/range-calendar";
	import { today, getLocalTimeZone } from "@internationalized/date";

	const start = today(getLocalTimeZone());
	const end = start.add({ days: 7 });

	let value = {
		start,
		end
	};
</script>

<RangeCalendar bind:value class="border rounded-md" />
