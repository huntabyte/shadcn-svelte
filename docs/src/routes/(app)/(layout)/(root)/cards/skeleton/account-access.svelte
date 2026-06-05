<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-36 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-64 rounded-md"></Skeleton>
	</CardHeader>
	<CardContent class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<Skeleton class="h-3 w-24 rounded-md"></Skeleton>
			<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex items-center justify-between">
				<Skeleton class="h-3 w-32 rounded-md"></Skeleton>
				<Skeleton class="h-3 w-12 rounded-md"></Skeleton>
			</div>
			<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
		</div>
	</CardContent>
	<CardFooter class="flex-col gap-4">
		<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
		<Skeleton class="h-14 w-full rounded-xl"></Skeleton>
	</CardFooter>
</Card>
