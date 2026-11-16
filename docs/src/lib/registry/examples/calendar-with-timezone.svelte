<script lang="ts">
	import { CalendarDate, DateFormatter, getLocalTimeZone, today } from "@internationalized/date";
	import { onMount } from "svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";

	let value = $state<CalendarDate>();
	let placeholder = $state<CalendarDate>();
	let timeZone = $state<string>();
	const selectedDate = $derived(value && timeZone ? value.toDate(timeZone) : undefined);
	const formatter = $derived(
		timeZone ? new DateFormatter("en-US", { dateStyle: "full", timeZone }) : undefined
	);

	onMount(() => {
		timeZone = getLocalTimeZone();
		placeholder = today(timeZone);
	});
</script>

<div class="flex flex-col items-center gap-4">
	{#if timeZone}
		<Calendar type="single" bind:value bind:placeholder class="rounded-lg border" />
	{:else}
		<Skeleton class="h-80 w-72" />
	{/if}
	<output aria-live="polite" class="text-center text-sm">
		{#if selectedDate && formatter}
			Selected date: <time datetime={selectedDate.toISOString()}
				>{formatter.format(selectedDate)}</time
			>
		{:else}
			No date selected.
		{/if}
	</output>
	<p class="text-xs text-muted-foreground">Time zone: {timeZone ?? "Detecting…"}</p>
</div>
