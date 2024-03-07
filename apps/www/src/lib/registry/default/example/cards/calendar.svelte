<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { RangeCalendar } from "$lib/registry/default/ui/range-calendar/index.js";
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
