<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
	const bars = [60, 80, 65, 95, 50, 100];
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-44 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-52 rounded-md"></Skeleton>
	</CardHeader>
	<CardContent>
		<div class="flex h-[200px] w-full items-end gap-3">
			{#each bars as height, i (i)}
				<div class="flex h-full flex-1 flex-col justify-end gap-2">
					<Skeleton
						class="w-full rounded-t-md rounded-b-none"
						style={`height: ${height}%`}
					></Skeleton>
					<Skeleton class="mx-auto h-3 w-6 rounded-md"></Skeleton>
				</div>
			{/each}
		</div>
	</CardContent>
	<CardContent>
		<div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
			<div class="bg-muted flex flex-col gap-2 rounded-xl p-4">
				<Skeleton class="bg-muted-foreground/15 h-3 w-20 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-5 w-28 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-3 w-24 rounded-md"></Skeleton>
			</div>
			<div class="bg-muted hidden flex-col gap-2 rounded-xl p-4 xl:flex">
				<Skeleton class="bg-muted-foreground/15 h-3 w-24 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-5 w-32 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-3 w-28 rounded-md"></Skeleton>
			</div>
		</div>
	</CardContent>
	<CardFooter>
		<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
	</CardFooter>
</Card>
