<script lang="ts">
	import MinusIcon from "@lucide/svelte/icons/minus";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";

	const data = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349];
	let goal = $state(350);

	function adjustGoal(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
</script>

<Drawer.Root>
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>Open Drawer</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>Move Goal</Drawer.Title>
				<Drawer.Description>Set your daily activity goal.</Drawer.Description>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<div class="flex items-center justify-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 shrink-0 rounded-full"
						onclick={() => adjustGoal(-10)}
						disabled={goal <= 200}
					>
						<MinusIcon />
						<span class="sr-only">Decrease</span>
					</Button>
					<div class="flex-1 text-center">
						<div class="text-7xl font-bold tracking-tighter">{goal}</div>
						<div class="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
					</div>
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 shrink-0 rounded-full"
						onclick={() => adjustGoal(10)}
						disabled={goal >= 400}
					>
						<PlusIcon />
						<span class="sr-only">Increase</span>
					</Button>
				</div>
				<div class="mt-3 h-[120px]">
					<svg
						viewBox="0 0 260 400"
						preserveAspectRatio="none"
						class="h-full w-full fill-(--chart-1)"
						role="img"
						aria-label="Daily activity goals"
					>
						{#each data as value, i (i)}
							<rect x={i * 20 + 2} y={400 - value} width="16" height={value} />
						{/each}
					</svg>
				</div>
			</div>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
