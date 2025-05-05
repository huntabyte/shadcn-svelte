<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FilterIcon from "@lucide/svelte/icons/filter";
	import TrendingDownIcon from "@lucide/svelte/icons/trending-down";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import AnalyticsDatePicker from "./components/analytics-date-picker.svelte";
	import ChartRevenue from "./components/chart-revenue.svelte";
	import ChartVisitors from "./components/chart-visitors.svelte";
	import ProductsTable from "./components/products-table.svelte";

	const products = [
		{
			id: "1",
			name: "BJÖRKSNÄS Dining Table",
			price: 599.99,
			stock: 12,
			dateAdded: "2023-06-15",
			status: "In Stock",
		},
		{
			id: "2",
			name: "POÄNG Armchair",
			price: 249.99,
			stock: 28,
			dateAdded: "2023-07-22",
			status: "In Stock",
		},
		{
			id: "3",
			name: "MALM Bed Frame",
			price: 399.99,
			stock: 15,
			dateAdded: "2023-08-05",
			status: "In Stock",
		},
		{
			id: "4",
			name: "KALLAX Shelf Unit",
			price: 179.99,
			stock: 32,
			dateAdded: "2023-09-12",
			status: "In Stock",
		},
		{
			id: "5",
			name: "STOCKHOLM Rug",
			price: 299.99,
			stock: 8,
			dateAdded: "2023-10-18",
			status: "Low Stock",
		},
		{
			id: "6",
			name: "KIVIK Sofa",
			price: 899.99,
			stock: 6,
			dateAdded: "2023-11-02",
			status: "Low Stock",
		},
		{
			id: "7",
			name: "LISABO Coffee Table",
			price: 149.99,
			stock: 22,
			dateAdded: "2023-11-29",
			status: "In Stock",
		},
		{
			id: "8",
			name: "HEMNES Bookcase",
			price: 249.99,
			stock: 17,
			dateAdded: "2023-12-10",
			status: "In Stock",
		},
		{
			id: "9",
			name: "EKEDALEN Dining Chairs (Set of 2)",
			price: 199.99,
			stock: 14,
			dateAdded: "2024-01-05",
			status: "In Stock",
		},
		{
			id: "10",
			name: "FRIHETEN Sleeper Sofa",
			price: 799.99,
			stock: 9,
			dateAdded: "2024-01-18",
			status: "Low Stock",
		},
	];
</script>

<div class="@container/page flex flex-1 flex-col gap-8 p-6">
	<Tabs.Root value="overview" class="gap-6">
		<div data-slot="dashboard-header" class="flex items-center justify-between">
			<Tabs.List class="@3xl/page:w-fit w-full">
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
				<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
				<Tabs.Trigger value="exports" disabled>Exports</Tabs.Trigger>
			</Tabs.List>
			<div class="@3xl/page:flex hidden items-center gap-2">
				<AnalyticsDatePicker />
				<Button variant="outline">
					<FilterIcon />
					Filter
				</Button>
				<Button variant="outline">
					<DownloadIcon />
					Export
				</Button>
			</div>
		</div>
		<Tabs.Content value="overview" class="flex flex-col gap-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card.Root>
					<Card.Header>
						<Card.Title>Total Revenue</Card.Title>
						<Card.Description>$1,250.00 in the last 30 days</Card.Description>
					</Card.Header>
					<Card.Footer>
						<Badge variant="outline">
							<TrendingUpIcon />
							+12.5%
						</Badge>
					</Card.Footer>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>New Customers</Card.Title>
						<Card.Description>-12 customers from last month</Card.Description>
					</Card.Header>
					<Card.Footer>
						<Badge variant="outline">
							<TrendingDownIcon />
							-20%
						</Badge>
					</Card.Footer>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>Active Accounts</Card.Title>
						<Card.Description>+2,345 users from last month</Card.Description>
					</Card.Header>
					<Card.Footer>
						<Badge variant="outline">
							<TrendingUpIcon />
							+12.5%
						</Badge>
					</Card.Footer>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>Growth Rate</Card.Title>
						<Card.Description>+12.5% increase per month</Card.Description>
					</Card.Header>
					<Card.Footer>
						<Badge variant="outline">
							<TrendingUpIcon />
							+4.5%
						</Badge>
					</Card.Footer>
				</Card.Root>
			</div>
			<div class="@4xl/page:grid-cols-[2fr_1fr] grid grid-cols-1 gap-4">
				<ChartRevenue />
				<ChartVisitors />
			</div>
			<ProductsTable {products} />
		</Tabs.Content>
	</Tabs.Root>
</div>
