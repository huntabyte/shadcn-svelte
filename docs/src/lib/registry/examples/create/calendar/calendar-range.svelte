<script lang="ts">
	import { getLocalTimeZone } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Range" containerClass="lg:col-span-full 2xl:col-span-full" class="p-12">
	<Card.Root class="mx-auto w-fit p-0">
		<Card.Content class="p-0">
			<RangeCalendar
				numberOfMonths={2}
				isDateUnavailable={(date) => {
					const dateObj = date.toDate(getLocalTimeZone());
					return dateObj > new Date() || dateObj < new Date("1900-01-01");
				}}
			/>
		</Card.Content>
	</Card.Root>
</Example>
