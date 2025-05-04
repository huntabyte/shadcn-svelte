<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<div class="flex w-full flex-wrap items-start gap-4">
	<div class="flex items-center gap-4">
		<Skeleton class="size-10 shrink-0 rounded-full" />
		<div class="grid gap-2">
			<Skeleton class="h-4 w-[150px]" />
			<Skeleton class="h-4 w-[100px]" />
		</div>
	</div>
	<div class="flex w-full flex-wrap items-start gap-4">
		{#each { length: 3 } as _, index (index)}
			<Card.Root class="@md:w-auto @md:min-w-sm w-full">
				<Card.Header>
					<Skeleton class="h-4 w-2/3" />
					<Skeleton class="h-4 w-1/2" />
				</Card.Header>
				<Card.Content>
					<Skeleton class="aspect-square w-full" />
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
