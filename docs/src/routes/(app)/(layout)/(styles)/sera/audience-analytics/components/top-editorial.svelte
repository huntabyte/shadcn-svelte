<script lang="ts">
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	type EditorialMetric = "views" | "time" | "shares";

	type EditorialRow = {
		rank: number;
		title: string;
		author: string;
		published: string;
		pageviews: string;
		avgTime: string;
	};

	const METRIC_LABEL: Record<EditorialMetric, string> = {
		views: "VIEWS",
		time: "TIME",
		shares: "SHARES",
	};

	const EDITORIAL_ROWS: EditorialRow[] = [
		{
			rank: 1,
			title: "The New Vanguard of Minimalist Architecture",
			author: "Elena Rostova",
			published: "Oct 12",
			pageviews: "45.2k",
			avgTime: "04:15",
		},
		{
			rank: 2,
			title: "Autumn Sartorial Code: Deconstructed Classics",
			author: "Julian Vance",
			published: "Oct 05",
			pageviews: "38.9k",
			avgTime: "03:42",
		},
		{
			rank: 3,
			title: "Interview: Director Sofia Coppola on The Aesthetics of Isolation",
			author: "Marcus Trent",
			published: "Sep 28",
			pageviews: "31.4k",
			avgTime: "06:20",
		},
		{
			rank: 4,
			title: "Sourcing Ceramics from Kyoto's Oldest Kilns",
			author: "Sarah Lin",
			published: "Oct 18",
			pageviews: "22.1k",
			avgTime: "02:55",
		},
		{
			rank: 5,
			title: "Field Notes from Copenhagen Design Week",
			author: "Noah Bennett",
			published: "Oct 21",
			pageviews: "19.7k",
			avgTime: "03:18",
		},
		{
			rank: 6,
			title: "A Studio Visit with Milan's Most Elusive Lighting Designer",
			author: "Claire Duval",
			published: "Oct 09",
			pageviews: "17.4k",
			avgTime: "04:02",
		},
		{
			rank: 7,
			title: "Collecting the New Avant-Garde in Contemporary Furniture",
			author: "Tommy Rhodes",
			published: "Sep 30",
			pageviews: "15.9k",
			avgTime: "03:36",
		},
		{
			rank: 8,
			title: "Inside Lisbon's Quiet Culinary Renaissance",
			author: "Amara Iqbal",
			published: "Oct 14",
			pageviews: "14.2k",
			avgTime: "05:08",
		},
		{
			rank: 9,
			title: "Why Slow Interiors Are Defining the Next Luxury Wave",
			author: "Henry Vale",
			published: "Oct 03",
			pageviews: "12.7k",
			avgTime: "03:11",
		},
		{
			rank: 10,
			title: "The Return of Print: Independent Magazine Covers to Watch",
			author: "Mina Okafor",
			published: "Sep 26",
			pageviews: "11.3k",
			avgTime: "02:49",
		},
	];

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	let visibleCount = $state(5);
	let isLoadingMore = $state(false);

	const hasMoreRows = $derived(visibleCount < EDITORIAL_ROWS.length);
	const visibleRows = $derived(EDITORIAL_ROWS.slice(0, visibleCount));

	function handleLoadMore() {
		if (!hasMoreRows || isLoadingMore) return;
		isLoadingMore = true;
		setTimeout(() => {
			visibleCount = EDITORIAL_ROWS.length;
			isLoadingMore = false;
		}, 2000);
	}
</script>

<Card.Root class={className} {...restProps}>
	<Card.Header>
		<div class="flex flex-col gap-(--gap) sm:flex-row">
			<div class="flex flex-col gap-1.5">
				<Card.Title class="text-2xl">Top Editorials</Card.Title>
				<Card.Description>Ranked by engagement</Card.Description>
			</div>
			<ToggleGroup.Root
				type="single"
				value="views"
				variant="outline"
				class="w-full sm:ml-auto sm:w-fit"
				aria-label="Top editorials metric selector"
			>
				{#each ["views", "time", "shares"] as EditorialMetric[] as metric (metric)}
					<ToggleGroup.Item value={metric} class="flex-1">
						{METRIC_LABEL[metric]}
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
		</div>
	</Card.Header>
	<Card.Content
		class="**:data-[slot=table-container]:no-scrollbar flex-1 **:data-[slot=table-container]:overflow-y-hidden"
	>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>#</Table.Head>
					<Table.Head>Title</Table.Head>
					<Table.Head>Published</Table.Head>
					<Table.Head>Page Views</Table.Head>
					<Table.Head>Read Time</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each visibleRows as row (row.rank)}
					<Table.Row>
						<Table.Cell class="translate-y-1 align-text-top">{row.rank}</Table.Cell>
						<Table.Cell>
							<div class="flex flex-col gap-2">
								<p class="font-heading text-foreground text-xl tracking-tight">
									{row.title}
								</p>
								<p
									class="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
								>
									By {row.author}
								</p>
							</div>
						</Table.Cell>
						<Table.Cell>{row.published}</Table.Cell>
						<Table.Cell>{row.pageviews}</Table.Cell>
						<Table.Cell>{row.avgTime}</Table.Cell>
						<Table.Cell class="text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											variant="ghost"
											size="icon-xs"
											aria-label={`Open actions for ${row.title}`}
										>
											<MoreHorizontalIcon />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Publish</DropdownMenu.Item>
									<DropdownMenu.Item variant="destructive"
										>Delete</DropdownMenu.Item
									>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer class="justify-center">
		{#if hasMoreRows}
			<Button
				type="button"
				variant="outline"
				onclick={handleLoadMore}
				disabled={isLoadingMore}
			>
				Load more content
				{#if isLoadingMore}
					<Spinner data-icon="inline-end" />
				{:else}
					<ArrowDownIcon data-icon="inline-end" />
				{/if}
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
