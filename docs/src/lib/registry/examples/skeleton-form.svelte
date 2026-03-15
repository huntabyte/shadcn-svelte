<script lang="ts">
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<div class="w-[300px] space-y-4">
	<div class="space-y-2">
		<Skeleton class="h-4 w-[80px]" />
		<Skeleton class="h-9 w-full rounded-md" />
	</div>
	<div class="space-y-2">
		<Skeleton class="h-4 w-[80px]" />
		<Skeleton class="h-9 w-full rounded-md" />
	</div>
	<div class="space-y-2">
		<Skeleton class="h-4 w-[80px]" />
		<Skeleton class="h-24 w-full rounded-md" />
	</div>
	<Skeleton class="h-9 w-[100px] rounded-md" />
</div>
