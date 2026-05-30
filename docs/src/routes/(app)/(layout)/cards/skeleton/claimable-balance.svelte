<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card>
	<CardHeader class="gap-3">
		<Skeleton class="h-4 w-36 rounded-md"></Skeleton>
		<Skeleton class="h-12 w-56 rounded-lg"></Skeleton>
		<Skeleton class="h-6 w-32 rounded-full"></Skeleton>
	</CardHeader>
	<CardContent class="flex flex-1 flex-col justify-end">
		<div class="bg-muted flex flex-col gap-3 rounded-xl p-4">
			<div class="flex items-center justify-between">
				<Skeleton class="bg-muted-foreground/15 h-4 w-28 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-4 w-20 rounded-md"></Skeleton>
			</div>
			<div class="flex items-center justify-between">
				<Skeleton class="bg-muted-foreground/15 h-4 w-32 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-4 w-16 rounded-md"></Skeleton>
			</div>
			<Skeleton class="bg-muted-foreground/15 h-px w-full rounded-none"></Skeleton>
			<div class="flex items-center justify-between">
				<Skeleton class="bg-muted-foreground/15 h-4 w-36 rounded-md"></Skeleton>
				<Skeleton class="bg-muted-foreground/15 h-4 w-24 rounded-md"></Skeleton>
			</div>
		</div>
	</CardContent>
	<CardFooter class="flex-col gap-2">
		<Skeleton class="h-3 w-full rounded-md"></Skeleton>
		<Skeleton class="h-3 w-11/12 rounded-md"></Skeleton>
		<Skeleton class="h-3 w-3/4 rounded-md"></Skeleton>
	</CardFooter>
</Card>
