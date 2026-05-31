<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
	const bars = [30, 70, 80, 60, 90, 75, 100, 85];
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-32 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-24 rounded-md"></Skeleton>
	</CardHeader>
	<CardContent class="flex flex-col gap-4">
		<div class="flex h-[140px] w-full items-end gap-2">
			{#each bars as height, i (i)}
				<div class="flex h-full flex-1 flex-col justify-end gap-1.5">
					<Skeleton class="w-full rounded-t rounded-b-none" style={`height: ${height}%`}
					></Skeleton>
					<Skeleton class="mx-auto h-3 w-5 rounded-md"></Skeleton>
				</div>
			{/each}
		</div>
		<Skeleton class="h-px w-full rounded-none"></Skeleton>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1.5">
				<Skeleton class="h-3 w-28 rounded-md"></Skeleton>
				<Skeleton class="h-5 w-20 rounded-md"></Skeleton>
			</div>
			<div class="flex flex-col gap-1.5">
				<Skeleton class="h-3 w-20 rounded-md"></Skeleton>
				<Skeleton class="h-5 w-24 rounded-md"></Skeleton>
			</div>
		</div>
	</CardContent>
	<CardFooter class="flex-col items-start gap-2">
		<Skeleton class="h-3 w-24 rounded-md"></Skeleton>
		<div class="flex w-full items-center gap-2">
			<Skeleton class="h-2 flex-1 rounded-full"></Skeleton>
			<Skeleton class="h-3 w-10 rounded-md"></Skeleton>
		</div>
	</CardFooter>
</Card>
