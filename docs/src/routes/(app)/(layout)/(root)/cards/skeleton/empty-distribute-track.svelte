<script lang="ts">
	import { Card, CardContent } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card>
	<CardContent>
		<div class="flex flex-col items-center gap-4 p-4">
			<Skeleton class="size-12 rounded-xl"></Skeleton>
			<div class="flex flex-col items-center gap-2">
				<Skeleton class="h-5 w-40 rounded-md"></Skeleton>
				<Skeleton class="h-3 w-64 rounded-md"></Skeleton>
				<Skeleton class="h-3 w-48 rounded-md"></Skeleton>
			</div>
			<Skeleton class="h-9 w-32 rounded-lg"></Skeleton>
		</div>
	</CardContent>
</Card>
