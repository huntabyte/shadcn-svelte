<script lang="ts">
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<div class="w-full">
	<div class="flex items-center gap-4 border-b py-3">
		<Skeleton class="h-4 w-[80px]" />
		<Skeleton class="h-4 w-[120px]" />
		<Skeleton class="ml-auto h-4 w-[100px]" />
	</div>
	{#each { length: 5 } as _, i (i)}
		<div class="flex items-center gap-4 border-b py-4 last:border-b-0">
			<Skeleton class="size-8 rounded-full" />
			<div class="flex-1 space-y-1.5">
				<Skeleton class="h-4 w-[160px]" />
				<Skeleton class="h-3 w-[110px]" />
			</div>
			<Skeleton class="h-4 w-[80px]" />
		</div>
	{/each}
</div>
