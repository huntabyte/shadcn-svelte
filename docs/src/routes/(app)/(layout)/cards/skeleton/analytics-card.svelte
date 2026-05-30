<script lang="ts">
	import { Card, CardAction, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-24 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-40 rounded-md"></Skeleton>
		<CardAction>
			<Skeleton class="h-7 w-28 rounded-lg"></Skeleton>
		</CardAction>
	</CardHeader>
	<Skeleton class="mx-6 mb-6 aspect-[1/0.35] w-auto rounded-lg"></Skeleton>
</Card>
