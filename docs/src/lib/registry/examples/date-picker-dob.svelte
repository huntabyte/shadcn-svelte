<script lang="ts">
	import { getLocalTimeZone, type DateValue } from "@internationalized/date";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	let open = $state(false);
	let value = $state<DateValue | undefined>();
</script>

<Field.Field class="mx-auto w-44">
	<Field.Label for="date">Date of birth</Field.Label>
	<Popover.Root bind:open>
		<Popover.Trigger id="date">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="justify-start font-normal">
					{value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : "Select date"}
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0" align="start">
			<Calendar
				type="single"
				bind:value
				captionLayout="dropdown"
				onValueChange={() => {
					open = false;
				}}
			/>
		</Popover.Content>
	</Popover.Root>
</Field.Field>
