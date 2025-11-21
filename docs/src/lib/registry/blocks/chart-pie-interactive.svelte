<script lang="ts">
	import { Arc, PieChart, Text } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import ChartStyle from "../ui/chart/chart-style.svelte";

	const desktopData = [
		{ month: "january", desktop: 186, color: "var(--color-january)" },
		{ month: "february", desktop: 305, color: "var(--color-february)" },
		{ month: "march", desktop: 237, color: "var(--color-march)" },
		{ month: "april", desktop: 173, color: "var(--color-april)" },
		{ month: "may", desktop: 209, color: "var(--color-may)" },
	];

	const chartConfig = {
		desktop: { label: "Desktop" },
		january: { label: "January", color: "var(--chart-1)" },
		february: { label: "February", color: "var(--chart-2)" },
		march: { label: "March", color: "var(--chart-3)" },
		april: { label: "April", color: "var(--chart-4)" },
		may: { label: "May", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;

	let activeMonth = $state(desktopData[0].month);

	const id = "pie-interactive";

	const activeIndex = $derived(desktopData.findIndex((item) => item.month === activeMonth));

	const months = $derived(desktopData.map((item) => item.month));
</script>

<Card.Root data-chart={id} class="flex flex-col">
	<ChartStyle {id} config={chartConfig} />
	<Card.Header class="flex flex-row items-start space-y-0 pb-0">
		<div class="grid gap-1">
			<Card.Title>Pie Chart - Interactive</Card.Title>
			<Card.Description>January - June 2024</Card.Description>
		</div>
		<Select.Root type="single" bind:value={activeMonth}>
			<Select.Trigger
				class="ms-auto h-7 w-[130px] rounded-lg ps-2.5 text-sm"
				aria-label="Select a value"
			>
				<span
					class="flex h-3 w-3 shrink-0 rounded-sm"
					style:background-color={`var(--color-${activeMonth})`}
				></span>
				{activeMonth
					? chartConfig[activeMonth as keyof typeof chartConfig].label
					: "Select month"}
			</Select.Trigger>
			<Select.Content align="end" class="rounded-xl">
				{#each months as month (month)}
					{@const config = chartConfig[month as keyof typeof chartConfig]}

					{#if config}
						<Select.Item
							value={month}
							label={config.label}
							class="rounded-lg [&_span]:flex"
						>
							<div class="flex items-center gap-2 text-xs">
								{config?.label}
							</div>
						</Select.Item>
					{/if}
				{/each}
			</Select.Content>
		</Select.Root>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container {id} config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<PieChart
				data={desktopData}
				label="month"
				key="month"
				value="desktop"
				c="color"
				props={{
					pie: {
						sort: (a, b) => {
							const monthOrder = ["january", "february", "march", "april", "may"];
							return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
						},
						motion: "tween",
					},
				}}
				innerRadius={60}
				padding={29}
			>
				{#snippet aboveMarks()}
					<Text
						value={desktopData[activeIndex].desktop.toLocaleString()}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground !text-3xl font-bold"
						dy={3}
					/>
					<Text
						value="Visitors"
						textAnchor="middle"
						verticalAnchor="middle"
						class="!fill-muted-foreground text-muted-foreground"
						dy={22}
					/>
				{/snippet}
				{#snippet arc({ props, index })}
					{@const isActive = index === activeIndex}
					{@const arcProps = isActive
						? { ...props, outerRadius: 60, innerRadius: 105 }
						: props}

					{#if isActive}
						<g>
							<Arc {...arcProps} />
							<Arc {...arcProps} outerRadius={107} innerRadius={119} />
						</g>
					{:else}
						<Arc {...arcProps} />
					{/if}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						labelKey="visitors"
						nameKey="month"
						indicator="line"
						labelFormatter={(_, payload) => {
							return chartConfig[payload?.[0].key as keyof typeof chartConfig].label;
						}}
					/>
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
