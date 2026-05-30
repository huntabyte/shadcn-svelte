<script lang="ts">
	import { Card, CardContent, CardHeader } from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Card>
	<CardContent class="flex justify-center pt-6">
		<Skeleton class="size-44 rounded-xl"></Skeleton>
	</CardContent>
	<CardHeader class="items-center gap-2 text-center">
		<Skeleton class="h-5 w-56 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-64 rounded-md"></Skeleton>
		<Skeleton class="h-4 w-48 rounded-md"></Skeleton>
	</CardHeader>
</Card>
