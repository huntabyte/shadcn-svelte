<script lang="ts">
	import { Card, CardContent } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card class="w-full">
	<CardContent class="flex flex-col gap-6">
		<Skeleton class="h-8 w-full rounded-2xl"></Skeleton>
		<div class="flex flex-wrap gap-2">
			<Skeleton class="h-9 w-20 rounded-lg"></Skeleton>
			<Skeleton class="h-9 w-24 rounded-lg"></Skeleton>
			<Skeleton class="h-9 w-20 rounded-lg"></Skeleton>
		</div>
		<div class="flex flex-col gap-3">
			<Skeleton class="h-9 w-full rounded-lg"></Skeleton>
			<Skeleton class="h-20 w-full rounded-lg"></Skeleton>
		</div>
		<div class="flex items-center gap-2">
			<div class="flex gap-2">
				<Skeleton class="h-5 w-12 rounded-full"></Skeleton>
				<Skeleton class="h-5 w-16 rounded-full"></Skeleton>
				<Skeleton class="4xl:block hidden h-5 w-14 rounded-full"></Skeleton>
			</div>
			<div class="ml-auto flex gap-3">
				<Skeleton class="size-4 rounded-full"></Skeleton>
				<Skeleton class="size-4 rounded-full"></Skeleton>
			</div>
			<div class="flex gap-3">
				<Skeleton class="size-4 rounded-sm"></Skeleton>
				<Skeleton class="4xl:block hidden size-4 rounded-sm"></Skeleton>
			</div>
			<Skeleton class="4xl:hidden ml-auto h-5 w-9 rounded-full"></Skeleton>
		</div>
		<div class="flex items-center gap-4">
			<Skeleton class="h-9 w-24 rounded-lg"></Skeleton>
			<div class="flex">
				<Skeleton class="h-9 w-28 rounded-l-lg rounded-r-none"></Skeleton>
				<Skeleton class="ml-px h-9 w-9 rounded-l-none rounded-r-lg"></Skeleton>
			</div>
			<Skeleton class="4xl:block ml-auto hidden h-5 w-9 rounded-full"></Skeleton>
		</div>
	</CardContent>
</Card>
