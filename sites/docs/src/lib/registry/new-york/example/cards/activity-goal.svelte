<script lang="ts">
	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Activity } from "$lib/components/docs/charts/index.js";

	let goal = $state(350);
	function updateGoal(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
</script>

<Card.Root>
	<Card.Header class="pb-4">
		<Card.Title>Move Goal</Card.Title>
		<Card.Description>Set your daily activity goal.</Card.Description>
	</Card.Header>
	<Card.Content class="pb-2">
		<div class="flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				size="icon"
				class="size-8 shrink-0 rounded-full"
				onclick={() => updateGoal(-10)}
				disabled={goal <= 200}
			>
				<Minus />
				<span class="sr-only">Decrease</span>
			</Button>
			<div class="flex-1 text-center">
				<div class="text-5xl font-bold tracking-tighter">{goal}</div>
				<div class="text-muted-foreground text-[0.70rem] uppercase">Calories/day</div>
			</div>

			<Button
				variant="outline"
				size="icon"
				class="size-8 shrink-0 rounded-full"
				onclick={() => updateGoal(10)}
				disabled={goal >= 400}
			>
				<Plus />
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
