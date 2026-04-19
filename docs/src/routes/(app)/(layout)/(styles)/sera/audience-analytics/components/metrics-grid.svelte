<script lang="ts">
	import TrendingDownIcon from "@lucide/svelte/icons/trending-down";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { cn } from "$lib/utils.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	type Metric = {
		label: string;
		value: string;
		comparison: string;
		change: string;
		trend: "up" | "down";
	};

	const METRIC_CARDS: Metric[] = [
		{
			label: "Total visitors",
			value: "248.5k",
			comparison: "12.4%",
			change: "vs last period",
			trend: "up",
		},
		{
			label: "Unique readers",
			value: "182.1k",
			comparison: "8.7%",
			change: "vs last period",
			trend: "up",
		},
		{
			label: "Avg. time on page",
			value: "3m 42s",
			comparison: "1.2%",
			change: "vs last period",
			trend: "down",
		},
		{
			label: "Bounce rate",
			value: "42.8%",
			comparison: "3.5%",
			change: "vs last period",
			trend: "down",
		},
	];
</script>

{#each METRIC_CARDS as metric (metric.label)}
	<Card.Root class={cn("col-span-full gap-0 md:col-span-6 lg:col-span-3")}>
		<Card.Content class="flex flex-col gap-2">
			<Card.Description class="text-xs uppercase">{metric.label}</Card.Description>
			<Card.Title class="text-5xl tracking-tight lowercase">{metric.value}</Card.Title>
			<Card.Description>
				{#if metric.trend === "up"}
					<TrendingUpIcon class="text-muted-foreground inline-block size-2.5" />
				{:else}
					<TrendingDownIcon class="text-muted-foreground inline-block size-2.5" />
				{/if}
				<span class="text-foreground">{metric.comparison}</span>
				<span>{metric.change}</span>
			</Card.Description>
		</Card.Content>
	</Card.Root>
{/each}
