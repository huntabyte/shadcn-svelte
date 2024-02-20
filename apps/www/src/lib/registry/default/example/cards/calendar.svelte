<script lang="ts">
	import * as Card from "@/registry/default/ui/card";
	import { RangeCalendar } from "@/registry/default/ui/range-calendar";
	import { today, getLocalTimeZone } from "@internationalized/date";
	const start = today(getLocalTimeZone());
	const end = start.add({ days: 8 });

	let value = {
		start,
		end,
	};
</script>

<Card.Root class="max-w-[280px] ">
	<Card.Content class="p-0">
		<RangeCalendar bind:value />
	</Card.Content>
</Card.Root>
