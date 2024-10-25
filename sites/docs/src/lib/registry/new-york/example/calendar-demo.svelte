<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/registry/new-york/ui/calendar/index.js";

	let value = $state(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value class="rounded-md border shadow" />
