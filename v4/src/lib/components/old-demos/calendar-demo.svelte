<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	let date = today(getLocalTimeZone());
</script>

<div class="@md:flex-row flex flex-col flex-wrap items-start gap-2">
	<Calendar type="single" bind:value={date} class="rounded-md border shadow-sm" />
</div>
