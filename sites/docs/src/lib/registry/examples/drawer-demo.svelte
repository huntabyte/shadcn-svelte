<script lang="ts">
	import MinusIcon from "@lucide/svelte/icons/minus";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { BarChart, type ChartContextValue } from "layerchart";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { cubicInOut } from "svelte/easing";

	const data = [
		{
			id: 1,
			goal: 400,
		},
		{
			id: 2,
			goal: 300,
		},
		{
			id: 3,
			goal: 200,
		},
		{
			id: 4,
			goal: 300,
		},
		{
			id: 5,
			goal: 200,
		},
		{
			id: 6,
			goal: 278,
		},
		{
			id: 7,
			goal: 189,
		},
		{
			id: 8,
			goal: 239,
		},
		{
			id: 9,
			goal: 300,
		},
		{
			id: 10,
			goal: 200,
		},
		{
			id: 11,
			goal: 278,
		},
		{
			id: 12,
			goal: 189,
		},
		{
			id: 13,
			goal: 349,
		},
	];

	const chartConfig = {
		goal: {
			label: "Goal",
			color: "var(--primary)",
		},
	} satisfies Chart.ChartConfig;
	let goal = $state(350);

	function handleClick(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
	let context = $state<ChartContextValue>();
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
						class="size-8 shrink-0 rounded-full"
						onclick={() => handleClick(-10)}
						disabled={goal <= 200}
					>
						<MinusIcon />
						<span class="sr-only">Decrease</span>
					</Button>
					<div class="flex-1 text-center">
						<div class="text-7xl font-bold tracking-tighter">
							{goal}
						</div>
						<div class="text-muted-foreground text-[0.70rem] uppercase">
							Calories/day
						</div>
					</div>
					<Button
						variant="outline"
						size="icon"
						class="size-8 shrink-0 rounded-full"
						onclick={() => handleClick(10)}
						disabled={goal >= 400}
					>
						<PlusIcon />
						<span class="sr-only">Increase</span>
					</Button>
				</div>
				<div class="mt-3 h-[120px]">
					<Chart.Container config={chartConfig} class="aspect-auto h-full w-full">
						<BarChart
							bind:context
							data={data.map((d, i) => ({ goal: d.goal, index: i }))}
							y="goal"
							x="index"
							xScale={scaleBand().padding(0.25)}
							axis={false}
							tooltip={false}
							props={{
								bars: {
									stroke: "none",
									rounded: "all",
									radius: 4,
									// use the height of the chart to animate the bars
									initialY: context?.height,
									initialHeight: 0,
									motion: {
										x: { type: "tween", duration: 500, easing: cubicInOut },
										width: { type: "tween", duration: 500, easing: cubicInOut },
										height: {
											type: "tween",
											duration: 500,
											easing: cubicInOut,
										},
										y: { type: "tween", duration: 500, easing: cubicInOut },
									},
								},
								highlight: { area: { fill: "none" } },
							}}
						/>
					</Chart.Container>
				</div>
			</div>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
