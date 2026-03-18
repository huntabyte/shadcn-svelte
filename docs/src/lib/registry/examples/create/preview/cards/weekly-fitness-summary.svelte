<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";

	const FITNESS_WEEKLY_LOAD = [
		{ day: "M", load: 84 },
		{ day: "T", load: 52 },
		{ day: "W", load: 73 },
		{ day: "T", load: 66 },
		{ day: "F", load: 91 },
		{ day: "S", load: 48 },
		{ day: "S", load: 61 },
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Weekly Fitness Summary</Card.Title>
		<Card.Description>Calories and workout load by day</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="grid grid-cols-7 gap-1.5">
			{#each FITNESS_WEEKLY_LOAD as { day, load }, index (index)}
				<div class="ring-border rounded-md p-1.5 text-center ring">
					<div class="text-muted-foreground text-sm">{day}</div>
					<div class="bg-muted relative mt-1 h-16 overflow-hidden rounded-sm">
						<div
							class="bg-chart-3 absolute inset-x-0 bottom-0 rounded-sm"
							style="height: {load}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
