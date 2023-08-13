<script lang="ts">
	import * as Card from "@/registry/default/ui/card";
	import { Button } from "@/registry/default/ui/button";
	import { Minus, Plus } from "lucide-svelte";
	import { Activity } from "@/components/docs/charts";

	let goal = 350;
	function updateGoal(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
</script>

<Card.Root>
	<Card.Header class="pb-4">
		<Card.Title class="text-base">Move Goal</Card.Title>
		<Card.Description>Set your daily activity goal.</Card.Description>
	</Card.Header>
	<Card.Content class="pb-2">
		<div class="flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				size="icon"
				class="h-8 w-8 shrink-0 rounded-full"
				on:click={() => updateGoal(-10)}
				disabled={goal <= 200}
			>
				<Minus class="h-4 w-4" />
				<span class="sr-only">Decrease</span>
			</Button>
			<div class="flex-1 text-center">
				<div class="text-5xl font-bold tracking-tighter">{goal}</div>
				<div class="text-[0.70rem] uppercase text-muted-foreground">
					Calories/day
				</div>
			</div>

			<Button
				variant="outline"
				size="icon"
				class="h-8 w-8 shrink-0 rounded-full"
				on:click={() => updateGoal(10)}
				disabled={goal >= 400}
			>
				<Plus class="h-4 w-4" />
				<span class="sr-only">Increase</span>
			</Button>
		</div>
		<div class="my-3 h-[60px]">
			<Activity />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Set Goal</Button>
	</Card.Footer>
</Card.Root>
