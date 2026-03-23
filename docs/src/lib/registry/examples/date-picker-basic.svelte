<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { cn } from "$lib/utils.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value = $state<DateValue | undefined>();
</script>

<div class="mx-auto w-44">
	<Field.Field>
		<Field.Label for="date-picker-basic">Date</Field.Label>
		<Popover.Root>
			<Popover.Trigger
				id="date-picker-basic"
				class={cn(
					buttonVariants({ variant: "outline" }),
					"justify-start font-normal",
					!value && "text-muted-foreground"
				)}
			>
				{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<Calendar type="single" bind:value />
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</div>
