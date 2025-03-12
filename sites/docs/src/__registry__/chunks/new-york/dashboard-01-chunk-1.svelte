<script lang="ts">
	import Users from "@lucide/svelte/icons/users";

	import * as Card from "$lib/registry/new-york/ui/card/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-1"
	data-x-chunk-description="A card showing the total subscriptions and the percentage difference from last month."
>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
		<Users class="text-muted-foreground size-4" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">+2350</div>
		<p class="text-muted-foreground text-xs">+180.1% from last month</p>
	</Card.Content>
</Card.Root>
