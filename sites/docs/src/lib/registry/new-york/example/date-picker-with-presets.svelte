<script lang="ts">
	import CalendarIcon from "svelte-radix/Calendar.svelte";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today,
	} from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Calendar } from "$lib/registry/new-york/ui/calendar/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value: DateValue | undefined = undefined;

	const items = [
		{ value: 0, label: "Today" },
		{ value: 1, label: "Tomorrow" },
		{ value: 3, label: "In 3 days" },
		{ value: 7, label: "In a week" },
	];
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				"w-[240px] justify-start text-left font-normal",
				!value && "text-muted-foreground"
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="flex w-auto flex-col space-y-2 p-2">
		<Select.Root
			{items}
			onSelectedChange={(v) => {
				if (!v) return;
				value = today(getLocalTimeZone()).add({ days: v.value });
			}}
		>
			<Select.Trigger>
				<Select.Value placeholder="Select" />
			</Select.Trigger>
			<Select.Content>
				{#each items as item}
					<Select.Item value={item.value}>{item.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<div class="rounded-md border">
			<Calendar bind:value />
		</div>
	</Popover.Content>
</Popover.Root>
