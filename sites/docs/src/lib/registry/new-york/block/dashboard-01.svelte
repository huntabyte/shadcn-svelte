<script lang="ts">
	import Activity from "@lucide/svelte/icons/activity";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import CircleUser from "@lucide/svelte/icons/circle-user";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import DollarSign from "@lucide/svelte/icons/dollar-sign";
	import Menu from "@lucide/svelte/icons/menu";
	import Package2 from "@lucide/svelte/icons/package-2";
	import Search from "@lucide/svelte/icons/search";
	import Users from "@lucide/svelte/icons/users";

	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import * as Sheet from "$lib/registry/new-york/ui/sheet/index.js";
	import * as Table from "$lib/registry/new-york/ui/table/index.js";
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="size-6" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a href="##" class="text-foreground hover:text-foreground transition-colors">
				Dashboard
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Orders
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Products
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Customers
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Analytics
			</a>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="icon" class="shrink-0 md:hidden">
						<Menu class="size-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="size-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Analytics </a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<form class="ml-auto flex-1 sm:flex-initial">
				<div class="relative">
					<Search class="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
					<Input
						type="search"
						placeholder="Search products..."
						class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					/>
				</div>
			</form>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="size-5" />
							<span class="sr-only">Toggle user menu</span>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item>Support</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-0"
				data-x-chunk-description="A card showing the total revenue in USD and the percentage difference from last month."
			>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
					<DollarSign class="text-muted-foreground size-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">$45,231.89</div>
					<p class="text-muted-foreground text-xs">+20.1% from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-1"
				data-x-chunk-description="A card showing the total subscriptions and the percentage difference from last month."
			>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
					<Users class="text-muted-foreground size-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">+2350</div>
					<p class="text-muted-foreground text-xs">+180.1% from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-2"
				data-x-chunk-description="A card showing the total sales and the percentage difference from last month."
			>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Sales</Card.Title>
					<CreditCard class="text-muted-foreground size-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">+12,234</div>
					<p class="text-muted-foreground text-xs">+19% from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-3"
				data-x-chunk-description="A card showing the total active users and the percentage difference from last hour."
			>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Active Now</Card.Title>
					<Activity class="text-muted-foreground size-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">+573</div>
					<p class="text-muted-foreground text-xs">+201 since last hour</p>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card.Root
				class="xl:col-span-2"
				data-x-chunk-name="dashboard-01-chunk-4"
				data-x-chunk-description="A card showing a table of recent transactions with a link to view all transactions."
			>
				<Card.Header class="flex flex-row items-center">
					<div class="grid gap-2">
						<Card.Title>Transactions</Card.Title>
						<Card.Description>Recent transactions from your store.</Card.Description>
					</div>
					<Button href="##" size="sm" class="ml-auto gap-1">
						View All
						<ArrowUpRight class="size-4" />
					</Button>
				</Card.Header>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Customer</Table.Head>
								<Table.Head class="xl:table.-column hidden">Type</Table.Head>
								<Table.Head class="xl:table.-column hidden">Status</Table.Head>
								<Table.Head class="xl:table.-column hidden">Date</Table.Head>
								<Table.Head class="text-right">Amount</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Liam Johnson</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										liam@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</Table.Cell>
								<Table.Cell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-23
								</Table.Cell>
								<Table.Cell class="text-right">$250.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Olivia Smith</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										olivia@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Declined</Badge>
								</Table.Cell>
								<Table.Cell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-24
								</Table.Cell>
								<Table.Cell class="text-right">$150.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Noah Williams</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										noah@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									Subscription
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</Table.Cell>
								<Table.Cell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-25
								</Table.Cell>
								<Table.Cell class="text-right">$350.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Emma Brown</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										emma@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</Table.Cell>
								<Table.Cell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-26
								</Table.Cell>
								<Table.Cell class="text-right">$450.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Liam Johnson</div>
									<div class="text-muted-foreground hidden text-sm md:inline">
										liam@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline">Approved</Badge>
								</Table.Cell>
								<Table.Cell
									class="md:table.-cell xl:table.-column hidden lg:hidden"
								>
									2023-06-27
								</Table.Cell>
								<Table.Cell class="text-right">$550.00</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Card.Content>
			</Card.Root>
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-5"
				data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
			>
				<Card.Header>
					<Card.Title>Recent Sales</Card.Title>
				</Card.Header>
				<Card.Content class="grid gap-8">
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden size-9 sm:flex">
							<Avatar.Image src="/avatars/01.png" alt="Avatar" />
							<Avatar.Fallback>OM</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Olivia Martin</p>
							<p class="text-muted-foreground text-sm">olivia.martin@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$1,999.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden size-9 sm:flex">
							<Avatar.Image src="/avatars/02.png" alt="Avatar" />
							<Avatar.Fallback>JL</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Jackson Lee</p>
							<p class="text-muted-foreground text-sm">jackson.lee@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$39.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden size-9 sm:flex">
							<Avatar.Image src="/avatars/03.png" alt="Avatar" />
							<Avatar.Fallback>IN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
							<p class="text-muted-foreground text-sm">isabella.nguyen@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$299.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden size-9 sm:flex">
							<Avatar.Image src="/avatars/04.png" alt="Avatar" />
							<Avatar.Fallback>WK</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">William Kim</p>
							<p class="text-muted-foreground text-sm">will@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$99.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden size-9 sm:flex">
							<Avatar.Image src="/avatars/05.png" alt="Avatar" />
							<Avatar.Fallback>SD</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Sofia Davis</p>
							<p class="text-muted-foreground text-sm">sofia.davis@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$39.00</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</main>
</div>
