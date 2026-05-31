<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Example title="Card">
	<Card.Root class="w-full">
		<Card.Header>
			<Skeleton class="h-4 w-2/3" />
			<Skeleton class="h-4 w-1/2" />
		</Card.Header>
		<Card.Content>
			<Skeleton class="aspect-square w-full" />
		</Card.Content>
	</Card.Root>
</Example>
