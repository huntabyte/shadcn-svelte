<script lang="ts">
	import { Calendar as CalendarIcon } from "radix-icons-svelte";
	import { type DateValue, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { Button } from "@/registry/new-york/ui/button";
	import { Calendar } from "@/registry/new-york/ui/calendar";
	import * as Popover from "@/registry/new-york/ui/popover";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value: DateValue | undefined = undefined;
</script>

<Popover.Root>
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
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar bind:value />
	</Popover.Content>
</Popover.Root>
