<script lang="ts">
	import { Card, CardAction, CardContent, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
	const rows = [0, 1, 2, 3];
	const miniBars = [40, 60, 80, 50];
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-48 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-64 rounded-md"></Skeleton>
		<CardAction>
			<Skeleton class="size-8 rounded-md"></Skeleton>
		</CardAction>
	</CardHeader>
	<CardContent>
		<div class="flex flex-col gap-2">
			{#each rows as row (row)}
				<div class="bg-muted flex items-center gap-3 rounded-xl p-3">
					<div class="flex flex-1 flex-col gap-2">
						<Skeleton class="bg-muted-foreground/15 h-4 w-28 rounded-md"></Skeleton>
						<Skeleton class="bg-muted-foreground/15 h-3 w-20 rounded-md"></Skeleton>
					</div>
					<div class="hidden h-8 w-24 items-end gap-1 md:flex">
						{#each miniBars as h, i (i)}
							<Skeleton
								class="bg-muted-foreground/15 flex-1 rounded-t-sm rounded-b-none"
								style={`height: ${h}%`}
							></Skeleton>
						{/each}
					</div>
					<Skeleton class="bg-muted-foreground/15 hidden h-4 w-16 rounded-md md:block"
					></Skeleton>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
