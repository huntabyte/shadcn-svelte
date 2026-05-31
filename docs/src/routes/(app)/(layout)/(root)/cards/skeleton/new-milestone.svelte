<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card>
	<CardHeader class="gap-2">
		<Skeleton class="h-5 w-44 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-72 rounded-md"></Skeleton>
	</CardHeader>
	<CardContent class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<Skeleton class="h-3 w-20 rounded-md"></Skeleton>
			<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
		</div>
		<div class="grid grid-cols-2 gap-3">
			<div class="flex flex-col gap-2">
				<Skeleton class="h-3 w-24 rounded-md"></Skeleton>
				<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
			</div>
			<div class="flex flex-col gap-2">
				<Skeleton class="h-3 w-20 rounded-md"></Skeleton>
				<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
			</div>
		</div>
	</CardContent>
	<CardFooter class="flex-col gap-2">
		<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
		<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
	</CardFooter>
</Card>
