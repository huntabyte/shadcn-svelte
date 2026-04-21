<script lang="ts">
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
	{#each { length: 5 } as _, index (index)}
		<div class="flex gap-4">
			<Skeleton class="h-4 flex-1" />
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-20" />
		</div>
	{/each}
</div>
