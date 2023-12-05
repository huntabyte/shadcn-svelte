<script lang="ts">
	import { Calendar as CalendarIcon } from "lucide-svelte";
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone
	} from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { Button } from "@/registry/default/ui/button";
	import { Calendar } from "@/registry/default/ui/calendar";
	import * as Popover from "@/registry/default/ui/popover";

	let value: DateValue | undefined = undefined;

	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				"w-[280px] justify-start text-left font-normal",
				!value && "text-muted-foreground"
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value
				? df.format(value.toDate(getLocalTimeZone()))
				: "Select a date"}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value initialFocus />
	</Popover.Content>
</Popover.Root>
