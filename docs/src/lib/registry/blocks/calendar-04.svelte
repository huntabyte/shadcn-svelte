<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";

	const start = today(getLocalTimeZone());
	const end = start.add({ days: 7 });

	let value = $state({
		start,
		end,
	});
</script>

<Calendar mode="range" bind:value class="rounded-lg border shadow-sm" />
