<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	const id = $props.id();

	let open = $state(false);
	let value = $state<DateRange | undefined>();
</script>

<div class="flex flex-col gap-3">
	<Label for="{id}-dates" class="px-1">Select your stay</Label>
	<Popover.Root bind:open>
		<Popover.Trigger id="{id}-dates">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="w-56 justify-between font-normal">
					{value?.start && value?.end
						? `${value.start.toDate(getLocalTimeZone()).toLocaleDateString()} - ${value.end.toDate(getLocalTimeZone()).toLocaleDateString()}`
						: "Select date"}
					<ChevronDownIcon />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0" align="start">
			<RangeCalendar bind:value captionLayout="dropdown" />
		</Popover.Content>
	</Popover.Root>
</div>
