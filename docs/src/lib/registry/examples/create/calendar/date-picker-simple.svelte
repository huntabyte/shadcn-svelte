<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let date = $state<DateValue | undefined>();
</script>

<Example title="Date Picker Simple">
	<Field.Field class="mx-auto w-72">
		<Field.Label for="date-picker-simple">Date</Field.Label>
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						id="date-picker-simple"
						class="justify-start px-2.5 font-normal"
					>
						<IconPlaceholder
							lucide="CalendarIcon"
							tabler="IconCalendar"
							hugeicons="CalendarIcon"
							phosphor="CalendarBlankIcon"
							data-icon="inline-start"
						/>
						{date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date"}
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<Calendar type="single" bind:value={date} />
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</Example>
