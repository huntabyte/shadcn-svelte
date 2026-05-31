<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Example title="Table">
	<div class="flex w-full flex-col gap-2">
		<div class="flex gap-4">
			<Skeleton class="h-4 flex-1" />
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-20" />
		</div>
		<div class="flex gap-4">
			<Skeleton class="h-4 flex-1" />
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-20" />
		</div>
		<div class="flex gap-4">
			<Skeleton class="h-4 flex-1" />
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-20" />
		</div>
	</div>
</Example>
