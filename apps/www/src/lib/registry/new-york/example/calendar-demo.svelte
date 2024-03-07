<script lang="ts">
	import { Calendar } from "$lib/registry/new-york/ui/calendar/index.js";
	import { today, getLocalTimeZone } from "@internationalized/date";

	let value = today(getLocalTimeZone());
</script>

<Calendar bind:value class="rounded-md border shadow" />
