<script lang="ts">
	import * as Card from "@/registry/new-york/ui/card/index.js";
	import { RangeCalendar } from "@/registry/new-york/ui/range-calendar/index.js";
	import { today, getLocalTimeZone } from "@internationalized/date";
	const start = today(getLocalTimeZone());
	const end = start.add({ days: 8 });

	let value = {
		start,
		end,
	};
</script>

<Card.Root class="max-w-[280px]">
	<Card.Content class="p-1">
		<RangeCalendar bind:value />
	</Card.Content>
</Card.Root>
