<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { cn } from "$lib/utils.js";

	let value = $state<DateValue | undefined>();
	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class={cn(
					"min-w-[200px] justify-start px-2 font-normal",
					!value && "text-muted-foreground"
				)}
			>
				<CalendarIcon class="text-muted-foreground" />
				{#if value}
					{df.format(value.toDate(getLocalTimeZone()))}
				{:else}
					<span> Pick a date </span>
				{/if}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar type="single" bind:value autofocus />
	</Popover.Content>
</Popover.Root>
