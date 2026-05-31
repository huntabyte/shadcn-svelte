<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
</script>

<Example title="Avatar">
	<div class="flex w-full items-center gap-4">
		<Skeleton class="size-10 shrink-0 rounded-full" />
		<div class="grid gap-2">
			<Skeleton class="h-4 w-[150px]" />
			<Skeleton class="h-4 w-[100px]" />
		</div>
	</div>
</Example>
