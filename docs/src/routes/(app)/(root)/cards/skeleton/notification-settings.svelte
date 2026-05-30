<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
	const rows = [0, 1, 2, 3];
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-32 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-64 rounded-md"></Skeleton>
	</CardHeader>
	<CardContent class="flex flex-col gap-4">
		{#each rows as row (row)}
			<div class="flex items-start gap-3">
				<Skeleton class="size-4 rounded-sm"></Skeleton>
				<div class="flex flex-1 flex-col gap-2">
					<Skeleton class="h-4 w-40 rounded-md"></Skeleton>
					<Skeleton class="h-3 w-56 rounded-md"></Skeleton>
				</div>
			</div>
		{/each}
	</CardContent>
	<CardFooter>
		<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
	</CardFooter>
</Card>
