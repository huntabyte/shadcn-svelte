<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Multiple">
	<Card.Root class="mx-auto w-fit p-0">
		<Card.Content class="p-0">
			<Calendar type="multiple" />
		</Card.Content>
	</Card.Root>
</Example>
