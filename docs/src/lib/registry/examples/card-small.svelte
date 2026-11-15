<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const featureName = "Scheduled reports";
	const steps = [
		"Choose a schedule (daily, or weekly).",
		"Send to channels or specific teammates.",
		"Include charts, tables, and key metrics.",
	];
</script>

<Card.Root size="sm" class="mx-auto w-full max-w-xs">
	<Card.Header>
		<Card.Title>{featureName}</Card.Title>
		<Card.Description>Weekly snapshots. No more manual exports.</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul class="grid gap-2 py-2 text-sm">
			{#each steps as step (step)}
				<li class="flex gap-2">
					<ChevronRightIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
					<span>{step}</span>
				</li>
			{/each}
		</ul>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button size="sm" class="w-full">Set up scheduled reports</Button>
		<Button variant="outline" size="sm" class="w-full">See what's new</Button>
	</Card.Footer>
</Card.Root>
