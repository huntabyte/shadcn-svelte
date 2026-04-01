<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Skeleton class="h-5 w-32" />
		<Skeleton class="h-4 w-48" />
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Skeleton class="h-32 w-full rounded-lg" />
		<div class="flex flex-col gap-2">
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-3/4" />
			<Skeleton class="h-4 w-1/2" />
		</div>
		<div class="flex gap-2">
			<Skeleton class="h-9 flex-1 rounded-md" />
			<Skeleton class="h-9 flex-1 rounded-md" />
		</div>
	</Card.Content>
</Card.Root>
