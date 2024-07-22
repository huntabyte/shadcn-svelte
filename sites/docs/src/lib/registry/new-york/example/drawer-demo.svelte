<script lang="ts">
	import Minus from "svelte-radix/Minus.svelte";
	import Plus from "svelte-radix/Plus.svelte";
	import { VisGroupedBar, VisXYContainer } from "@unovis/svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Drawer from "$lib/registry/new-york/ui/drawer/index.js";

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
	const x = (d: { goal: number; id: number }) => d.id;
	const y = (d: { goal: number; id: number }) => d.goal;

	let goal = 350;

	function handleClick(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
</script>

<Drawer.Root>
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Open Drawer</Button>
	</Drawer.Trigger>
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
						on:click={() => handleClick(-10)}
						disabled={goal <= 200}
					>
						<Minus class="h-4 w-4" />
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
						class="h-8 w-8 shrink-0 rounded-full"
						on:click={() => handleClick(10)}
					>
						<Plus class="h-4 w-4" />
						<span class="sr-only">Increase</span>
					</Button>
				</div>
				<div class="mt-3 h-[120px]">
					<VisXYContainer {data} height={60}>
						<VisGroupedBar {x} {y} color="hsl(var(--primary) / 0.2)" />
					</VisXYContainer>
				</div>
			</div>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} variant="outline">Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
