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
	let open = $state(false);
</script>

<Example title="Date Picker with Dropdowns">
	<Field.Field class="mx-auto w-72">
		<Popover.Root bind:open>
			<Field.Label for="date-picker-with-dropdowns-desktop">Date</Field.Label>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						id="date-picker-with-dropdowns-desktop"
						class="justify-start px-2.5 font-normal"
					>
						{date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date"}
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDownIcon"
							phosphor="CaretDownIcon"
							data-icon="inline-start"
							class="ml-auto"
						/>
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<Calendar type="single" bind:value={date} captionLayout="dropdown" />
				<div class="flex gap-2 border-t p-2">
					<Button
						variant="outline"
						size="sm"
						class="w-full"
						onclick={() => (open = false)}
					>
						Done
					</Button>
				</div>
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</Example>
