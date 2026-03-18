<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="In Popover">
	<Popover.Root>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="px-2.5 font-normal">
					<IconPlaceholder
						lucide="CalendarIcon"
						tabler="IconCalendar"
						hugeicons="CalendarIcon"
						phosphor="CalendarBlankIcon"
						remixicon="RiCalendarLine"
						data-icon="inline-start"
					/>
					Open Calendar
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" align="start">
			<Calendar type="single" />
		</Popover.Content>
	</Popover.Root>
</Example>
