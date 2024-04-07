<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
</script>

<Card.Root data-x-chunk="dashboard-01-chunk-3">
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">Active Now</Card.Title>
		<Activity class="h-4 w-4 text-muted-foreground" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">+573</div>
		<p class="text-xs text-muted-foreground">+201 since last hour</p>
	</Card.Content>
</Card.Root>
