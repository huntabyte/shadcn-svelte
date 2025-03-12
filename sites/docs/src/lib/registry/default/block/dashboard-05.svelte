<script lang="ts">
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import Copy from "@lucide/svelte/icons/copy";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import File from "@lucide/svelte/icons/file";
	import House from "@lucide/svelte/icons/house";
	import ChartLine from "@lucide/svelte/icons/chart-line";
	import ListFilter from "@lucide/svelte/icons/list-filter";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import Package from "@lucide/svelte/icons/package";
	import Package2 from "@lucide/svelte/icons/package-2";
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import Truck from "@lucide/svelte/icons/truck";
	import UsersRound from "@lucide/svelte/icons/users-round";

	import { Badge } from "$lib/registry/default/ui/badge/index.js";
	import * as Breadcrumb from "$lib/registry/default/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import * as Pagination from "$lib/registry/default/ui/pagination/index.js";
	import { Progress } from "$lib/registry/default/ui/progress/index.js";
	import { Separator } from "$lib/registry/default/ui/separator/index.js";
	import * as Sheet from "$lib/registry/default/ui/sheet/index.js";
	import * as Table from "$lib/registry/default/ui/table/index.js";
	import * as Tabs from "$lib/registry/default/ui/tabs/index.js";
	import * as Tooltip from "$lib/registry/default/ui/tooltip/index.js";
</script>

<div class="bg-muted/40 flex min-h-screen w-full flex-col">
	<aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
			<a
				href="##"
				class="bg-primary text-primary-foreground group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
			>
				<Package2 class="size-4 transition-all group-hover:scale-110" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<House class="size-5" />
								<span class="sr-only">Dashboard</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Dashboard</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="bg-accent text-accent-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<ShoppingCart class="size-5" />
								<span class="sr-only">Orders</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Orders</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<Package class="size-5" />
								<span class="sr-only">Products</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Products</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<UsersRound class="size-5" />
								<span class="sr-only">Customers</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Customers</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<ChartLine class="size-5" />
								<span class="sr-only">Analytics</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Analytics</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<a
								href="##"
								class="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
								{...props}
							>
								<Settings class="size-5" />
								<span class="sr-only">Settings</span>
							</a>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Settings</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</nav>
	</aside>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline" size="icon" class="sm:hidden">
							<PanelLeft class="size-5" />
							<span class="sr-only">Toggle Menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="left" class="sm:max-w-xs">
					<nav class="grid gap-6 text-lg font-medium">
						<a
							href="##"
							class="bg-primary text-primary-foreground group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
						>
							<Package2 class="size-5 transition-all group-hover:scale-110" />
							<span class="sr-only">Acme Inc</span>
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<House class="size-5" />
							Dashboard
						</a>
						<a href="##" class="text-foreground flex items-center gap-4 px-2.5">
							<ShoppingCart class="size-5" />
							Orders
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<Package class="size-5" />
							Products
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<UsersRound class="size-5" />
							Customers
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<ChartLine class="size-5" />
							Settings
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<Breadcrumb.Root class="hidden md:flex">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Orders</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Recent Orders</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
				<Input
					type="search"
					placeholder="Search..."
					class="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
						>
							<img
								src="/images/placeholder-user.jpg"
								width={36}
								height={36}
								alt="Avatar"
								class="overflow-hidden rounded-full"
							/>
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
		</header>
		<main
			class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
		>
			<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
					<Card.Root
						class="sm:col-span-2"
						data-x-chunk-name="dashboard-05-chunk-0"
						data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order."
					>
						<Card.Header class="pb-3">
							<Card.Title>Your Orders</Card.Title>
							<Card.Description class="max-w-lg text-balance leading-relaxed">
								Introducing Our Dynamic Orders Dashboard for Seamless Management and
								Insightful Analysis.
							</Card.Description>
						</Card.Header>
						<Card.Footer>
							<Button>Create New Order</Button>
						</Card.Footer>
					</Card.Root>
					<Card.Root
						data-x-chunk-name="dashboard-05-chunk-1"
						data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
					>
						<Card.Header class="pb-2">
							<Card.Description>This Week</Card.Description>
							<Card.Title class="text-4xl">$1329</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="text-muted-foreground text-xs">+25% from last week</div>
						</Card.Content>
						<Card.Footer>
							<Progress value={25} aria-label="25% increase" />
						</Card.Footer>
					</Card.Root>
					<Card.Root
						data-x-chunk-name="dashboard-05-chunk-2"
						data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
					>
						<Card.Header class="pb-2">
							<Card.Description>This Month</Card.Description>
							<Card.Title class="text-3xl">$5,329</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="text-muted-foreground text-xs">+10% from last month</div>
						</Card.Content>
						<Card.Footer>
							<Progress value={12} aria-label="12% increase" />
						</Card.Footer>
					</Card.Root>
				</div>
				<Tabs.Root value="week">
					<div class="flex items-center">
						<Tabs.List>
							<Tabs.Trigger value="week">Week</Tabs.Trigger>
							<Tabs.Trigger value="month">Month</Tabs.Trigger>
							<Tabs.Trigger value="year">Year</Tabs.Trigger>
						</Tabs.List>
						<div class="ml-auto flex items-center gap-2">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button {...props} size="sm" class="h-7 gap-1 text-sm">
											<ListFilter class="size-3.5" />
											<span class="sr-only sm:not-sr-only">Filter</span>
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Group>
										<DropdownMenu.GroupHeading
											>Filter by</DropdownMenu.GroupHeading
										>
										<DropdownMenu.Separator />
										<DropdownMenu.CheckboxItem checked>
											Fulfilled
										</DropdownMenu.CheckboxItem>
										<DropdownMenu.CheckboxItem>
											Declined
										</DropdownMenu.CheckboxItem>
										<DropdownMenu.CheckboxItem>
											Refunded
										</DropdownMenu.CheckboxItem>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
							<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
								<File class="size-3.5" />
								<span class="sr-only sm:not-sr-only">Export</span>
							</Button>
						</div>
					</div>
					<Tabs.Content value="week">
						<Card.Root
							data-x-chunk-name="dashboard-05-chunk-3"
							data-x-chunk-description="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount."
						>
							<Card.Header class="px-7">
								<Card.Title>Orders</Card.Title>
								<Card.Description>Recent orders from your store.</Card.Description>
							</Card.Header>
							<Card.Content>
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head>Customer</Table.Head>
											<Table.Head class="hidden sm:table-cell">
												Type
											</Table.Head>
											<Table.Head class="hidden sm:table-cell">
												Status
											</Table.Head>
											<Table.Head class="hidden md:table-cell">
												Date
											</Table.Head>
											<Table.Head class="text-right">Amount</Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row class="bg-accent">
											<Table.Cell>
												<div class="font-medium">Liam Johnson</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													liam@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Sale
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-23
											</Table.Cell>
											<Table.Cell class="text-right">$250.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Olivia Smith</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													olivia@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Refund
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="outline">
													Declined
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-24
											</Table.Cell>
											<Table.Cell class="text-right">$150.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Noah Williams</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													noah@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Subscription
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-25
											</Table.Cell>
											<Table.Cell class="text-right">$350.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Emma Brown</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													emma@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Sale
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-26
											</Table.Cell>
											<Table.Cell class="text-right">$450.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Liam Johnson</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													liam@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Sale
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-23
											</Table.Cell>
											<Table.Cell class="text-right">$250.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Liam Johnson</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													liam@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Sale
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-23
											</Table.Cell>
											<Table.Cell class="text-right">$250.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Olivia Smith</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													olivia@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Refund
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="outline">
													Declined
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-24
											</Table.Cell>
											<Table.Cell class="text-right">$150.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<div class="font-medium">Emma Brown</div>
												<div
													class="text-muted-foreground hidden text-sm md:inline"
												>
													emma@example.com
												</div>
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												Sale
											</Table.Cell>
											<Table.Cell class="hidden sm:table-cell">
												<Badge class="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</Table.Cell>
											<Table.Cell class="hidden md:table-cell">
												2023-06-26
											</Table.Cell>
											<Table.Cell class="text-right">$450.00</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table.Root>
							</Card.Content>
						</Card.Root>
					</Tabs.Content>
				</Tabs.Root>
			</div>
			<div>
				<Card.Root
					class="overflow-hidden"
					data-x-chunk-name="dashboard-05-chunk-4"
					data-x-chunk-description="An order details card with order details, shipping information, customer information and payment information."
				>
					<Card.Header class="bg-muted/50 flex flex-row items-start">
						<div class="grid gap-0.5">
							<Card.Title class="group flex items-center gap-2 text-lg">
								Order Oe31b70H
								<Button
									size="icon"
									variant="outline"
									class="size-6 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<Copy class="size-3" />
									<span class="sr-only">Copy Order ID</span>
								</Button>
							</Card.Title>
							<Card.Description>Date: November 23, 2023</Card.Description>
						</div>
						<div class="ml-auto flex items-center gap-1">
							<Button size="sm" variant="outline" class="h-8 gap-1">
								<Truck class="size-3.5" />
								<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
									Track Order
								</span>
							</Button>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											size="icon"
											variant="outline"
											class="size-8"
										>
											<EllipsisVertical class="size-3.5" />
											<span class="sr-only">More</span>
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Export</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>Trash</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</Card.Header>
					<Card.Content class="p-6 text-sm">
						<div class="grid gap-3">
							<div class="font-semibold">Order Details</div>
							<ul class="grid gap-3">
								<li class="flex items-center justify-between">
									<span class="text-muted-foreground">
										Glimmer Lamps x <span>2</span>
									</span>
									<span>$250.00</span>
								</li>
								<li class="flex items-center justify-between">
									<span class="text-muted-foreground">
										Aqua Filters x <span>1</span>
									</span>
									<span>$49.00</span>
								</li>
							</ul>
							<Separator class="my-2" />
							<ul class="grid gap-3">
								<li class="flex items-center justify-between">
									<span class="text-muted-foreground">Subtotal</span>
									<span>$299.00</span>
								</li>
								<li class="flex items-center justify-between">
									<span class="text-muted-foreground">Shipping</span>
									<span>$5.00</span>
								</li>
								<li class="flex items-center justify-between">
									<span class="text-muted-foreground">Tax</span>
									<span>$25.00</span>
								</li>
								<li class="flex items-center justify-between font-semibold">
									<span class="text-muted-foreground">Total</span>
									<span>$329.00</span>
								</li>
							</ul>
						</div>
						<Separator class="my-4" />
						<div class="grid grid-cols-2 gap-4">
							<div class="grid gap-3">
								<div class="font-semibold">Shipping Information</div>
								<address class="text-muted-foreground grid gap-0.5 not-italic">
									<span>Liam Johnson</span>
									<span>1234 Main St.</span>
									<span>Anytown, CA 12345</span>
								</address>
							</div>
							<div class="grid auto-rows-max gap-3">
								<div class="font-semibold">Billing Information</div>
								<div class="text-muted-foreground">Same as shipping address</div>
							</div>
						</div>
						<Separator class="my-4" />
						<div class="grid gap-3">
							<div class="font-semibold">Customer Information</div>
							<dl class="grid gap-3">
								<div class="flex items-center justify-between">
									<dt class="text-muted-foreground">Customer</dt>
									<dd>Liam Johnson</dd>
								</div>
								<div class="flex items-center justify-between">
									<dt class="text-muted-foreground">Email</dt>
									<dd>
										<a href="mailto:">liam@acme.com</a>
									</dd>
								</div>
								<div class="flex items-center justify-between">
									<dt class="text-muted-foreground">Phone</dt>
									<dd>
										<a href="tel:">+1 234 567 890</a>
									</dd>
								</div>
							</dl>
						</div>
						<Separator class="my-4" />
						<div class="grid gap-3">
							<div class="font-semibold">Payment Information</div>
							<dl class="grid gap-3">
								<div class="flex items-center justify-between">
									<dt class="text-muted-foreground flex items-center gap-1">
										<CreditCard class="size-4" />
										Visa
									</dt>
									<dd>**** **** **** 4532</dd>
								</div>
							</dl>
						</div>
					</Card.Content>
					<Card.Footer class="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
						<div class="text-muted-foreground text-xs">
							Updated <time dateTime="2023-11-23">November 23, 2023</time>
						</div>
						<Pagination.Root count={10} class="ml-auto mr-0 w-auto">
							<Pagination.Content>
								<Pagination.Item>
									<Button size="icon" variant="outline" class="size-6">
										<ChevronLeft class="size-3.5" />
										<span class="sr-only">Previous Order</span>
									</Button>
								</Pagination.Item>
								<Pagination.Item>
									<Button size="icon" variant="outline" class="size-6">
										<ChevronRight class="size-3.5" />
										<span class="sr-only">Next Order</span>
									</Button>
								</Pagination.Item>
							</Pagination.Content>
						</Pagination.Root>
					</Card.Footer>
				</Card.Root>
			</div>
		</main>
	</div>
</div>
