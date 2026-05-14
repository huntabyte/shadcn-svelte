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

	let open = $state(false);
	let value = $state<DateValue | undefined>();
</script>

<Field.Field class="mx-auto w-44">
	<Field.Label for="date-picker-dob">Date of birth</Field.Label>
	<Popover.Root bind:open>
		<Popover.Trigger
			id="date-picker-dob"
			class={cn(
				buttonVariants({ variant: "outline" }),
				"justify-start font-normal",
				!value && "text-muted-foreground"
			)}
		>
			{value ? df.format(value.toDate(getLocalTimeZone())) : "Select date"}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0" align="start">
			<Calendar
				type="single"
				captionLayout="dropdown"
				bind:value
				onValueChange={() => {
					open = false;
				}}
			/>
		</Popover.Content>
	</Popover.Root>
</Field.Field>
