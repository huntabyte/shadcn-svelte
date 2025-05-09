<script lang="ts">
	import Activity from "@lucide/svelte/icons/activity";

	import * as Card from "$lib/registry/new-york/ui/card/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-3"
	data-x-chunk-description="A card showing the total active users and the percentage difference from last hour."
>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">Active Now</Card.Title>
		<Activity class="text-muted-foreground size-4" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">+573</div>
		<p class="text-muted-foreground text-xs">+201 since last hour</p>
	</Card.Content>
</Card.Root>
