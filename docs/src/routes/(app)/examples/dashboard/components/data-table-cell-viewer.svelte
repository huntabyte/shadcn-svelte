<script lang="ts">
	import TrendingUpIcon from "@tabler/icons-svelte/icons/trending-up";
	import { AreaChart } from "layerchart";
	import { scaleUtc } from "d3-scale";
	import { curveNatural } from "d3-shape";

	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import type { Schema } from "./schemas.js";

	const chartData = [
		{ date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
		{ date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
		{ date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
		{ date: new Date("2024-04-01"), desktop: 73, mobile: 190 },
		{ date: new Date("2024-05-01"), desktop: 209, mobile: 130 },
		{ date: new Date("2024-06-01"), desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "var(--primary)",
		},
		mobile: {
			label: "Mobile",
			color: "var(--primary)",
		},
	} satisfies Chart.ChartConfig;

	const isMobile = new IsMobile();

	let { item }: { item: Schema } = $props();

	let type = $state(item.type);
	let status = $state(item.status);
	let reviewer = $state(item.reviewer);
</script>

<Drawer.Root direction={isMobile.current ? "bottom" : "right"}>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button variant="link" class="text-foreground w-fit px-0 text-start" {...props}>
				{item.header}
			</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header class="gap-1">
			<Drawer.Title>{item.header}</Drawer.Title>
			<Drawer.Description>Showing total visitors for the last 6 months</Drawer.Description>
		</Drawer.Header>
		<div class="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
			{#if !isMobile.current}
				<Chart.Container config={chartConfig}>
					<AreaChart
						data={chartData}
						x="date"
						xScale={scaleUtc()}
						yDomain={[0, 600]}
						series={[
							{
								key: "mobile",
								label: "Mobile",
								color: chartConfig.mobile.color,
							},
							{
								key: "desktop",
								label: "Desktop",
								color: chartConfig.desktop.color,
							},
						]}
						seriesLayout="stack"
						props={{
							area: {
								curve: curveNatural,
								"fill-opacity": 0.4,
								line: { class: "stroke-1" },
								motion: "tween",
							},
							xAxis: {
								format: (v) => v.toLocaleDateString("en-US", { month: "short" }),
							},
							yAxis: { ticks: [0, 300, 600] },
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip
								labelFormatter={(v: Date) => {
									return v.toLocaleDateString("en-US", {
										month: "long",
									});
								}}
								indicator="dot"
							/>
						{/snippet}
					</AreaChart>
				</Chart.Container>
				<Separator />
				<div class="grid gap-2">
					<div class="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month
						<TrendingUpIcon class="size-4" />
					</div>
					<div class="text-muted-foreground">
						Showing total visitors for the last 6 months. This is just some random text
						to test the layout. It spans multiple lines and should wrap around.
					</div>
				</div>
				<Separator />
			{/if}
			<form class="flex flex-col gap-4">
				<div class="flex flex-col gap-3">
					<Label for="header">Header</Label>
					<Input id="header" value={item.header} />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-3">
						<Label for="type">Type</Label>
						<Select.Root type="single" bind:value={type}>
							<Select.Trigger id="type" class="w-full">
								{type ?? "Select a type"}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Table of Contents"
									>Table of Contents</Select.Item
								>
								<Select.Item value="Executive Summary"
									>Executive Summary</Select.Item
								>
								<Select.Item value="Technical Approach">
									Technical Approach
								</Select.Item>
								<Select.Item value="Design">Design</Select.Item>
								<Select.Item value="Capabilities">Capabilities</Select.Item>
								<Select.Item value="Focus Documents">Focus Documents</Select.Item>
								<Select.Item value="Narrative">Narrative</Select.Item>
								<Select.Item value="Cover Page">Cover Page</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="flex flex-col gap-3">
						<Label for="status">Status</Label>
						<Select.Root type="single" bind:value={status}>
							<Select.Trigger id="status" class="w-full">
								{status ?? "Select a status"}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Done">Done</Select.Item>
								<Select.Item value="In Progress">In Progress</Select.Item>
								<Select.Item value="Not Started">Not Started</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-3">
						<Label for="target">Target</Label>
						<Input id="target" value={item.target} />
					</div>
					<div class="flex flex-col gap-3">
						<Label for="limit">Limit</Label>
						<Input id="limit" value={item.limit} />
					</div>
				</div>
				<div class="flex flex-col gap-3">
					<Label for="reviewer">Reviewer</Label>
					<Select.Root type="single" bind:value={reviewer}>
						<Select.Trigger id="reviewer" class="w-full">
							{reviewer ?? "Select a reviewer"}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Eddie Lake">Eddie Lake</Select.Item>
							<Select.Item value="Jamik Tashpulatov">Jamik Tashpulatov</Select.Item>
							<Select.Item value="Emily Whalen">Emily Whalen</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</form>
		</div>
		<Drawer.Footer>
			<Button>Submit</Button>
			<Drawer.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Done</Button>
				{/snippet}
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
