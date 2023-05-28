<script lang="ts">
	import {
		Activity,
		CreditCard,
		DollarSign,
		Download,
		Users
	} from "lucide-svelte";
	import { Avatar, AvatarFallback, AvatarImage } from "$components/ui/avatar";
	import { Button } from "$components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$components/ui/card";
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger
	} from "$components/ui/tabs";
	import MainNav from "./MainNav.svelte";
	import Overview from "./Overview.svelte";
	import RecentSales from "./RecentSales.svelte";
	import Search from "./Search.svelte";
</script>

<div class="md:hidden">
	<img
		src="/examples/dashboard-light.png"
		width={1280}
		height={866}
		alt="Dashboard"
		class="block dark:hidden"
	/>
	<img
		src="/examples/dashboard-dark.png"
		width={1280}
		height={866}
		alt="Dashboard"
		class="hidden dark:block"
	/>
</div>
<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<Search />
				<Avatar className="h-8 w-8">
					<AvatarImage src="/avatars/01.png" alt="@shadcn" />
					<AvatarFallback>SC</AvatarFallback>
				</Avatar>
			</div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
			<div class="flex items-center space-x-2">
				<Button size="sm">
					<Download class="mr-2 h-4 w-4" />
					Download
				</Button>
			</div>
		</div>
		<Tabs value="overview" class="space-y-4">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
				<TabsTrigger value="reports" disabled>Reports</TabsTrigger>
				<TabsTrigger value="notifications" disabled
					>Notifications</TabsTrigger
				>
			</TabsList>
			<TabsContent value="overview" class="space-y-4">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<CardTitle class="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<DollarSign class="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">$45,231.89</div>
							<p class="text-xs text-muted-foreground">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<CardTitle class="text-sm font-medium">
								Subscriptions
							</CardTitle>
							<Users class="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+2350</div>
							<p class="text-xs text-muted-foreground">
								+180.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<CardTitle class="text-sm font-medium"
								>Sales</CardTitle
							>
							<CreditCard class="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+12,234</div>
							<p class="text-xs text-muted-foreground">
								+19% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<CardTitle class="text-sm font-medium">
								Active Now
							</CardTitle>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+573</div>
							<p class="text-xs text-muted-foreground">
								+201 since last hour
							</p>
						</CardContent>
					</Card>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card class="col-span-4">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<Overview />
						</CardContent>
					</Card>
					<Card class="col-span-3">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>
								You made 265 sales this month.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentSales />
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>
