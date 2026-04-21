<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value = $state<DateValue | undefined>();
</script>

<Field.Field class="mx-auto w-44">
	<Field.Label for="date-picker-basic">Date</Field.Label>
	<Popover.Root>
		<Popover.Trigger id="date-picker-basic">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="justify-start font-normal">
					{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" align="start">
			<Calendar type="single" bind:value />
		</Popover.Content>
	</Popover.Root>
</Field.Field>
