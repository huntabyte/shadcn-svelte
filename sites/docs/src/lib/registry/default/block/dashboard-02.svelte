<script lang="ts">
	import CircleUser from "@lucide/svelte/icons/circle-user";
	import ChartLine from "@lucide/svelte/icons/chart-line";
	import Package from "@lucide/svelte/icons/package";
	import House from "@lucide/svelte/icons/house";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import Bell from "@lucide/svelte/icons/bell";
	import Menu from "@lucide/svelte/icons/menu";
	import Package2 from "@lucide/svelte/icons/package-2";
	import Search from "@lucide/svelte/icons/search";
	import Users from "@lucide/svelte/icons/users";

	import { Badge } from "$lib/registry/default/ui/badge/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import * as Sheet from "$lib/registry/default/ui/sheet/index.js";
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="bg-muted/40 hidden border-r md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Package2 class="size-6" />
					<span class="">Acme Inc</span>
				</a>
				<Button variant="outline" size="icon" class="ml-auto size-8">
					<Bell class="size-4" />
					<span class="sr-only">Toggle notifications</span>
				</Button>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<a
						href="##"
						class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<House class="h-4 w-4" />
						Dashboard
					</a>
					<a
						href="##"
						class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<ShoppingCart class="size-4" />
						Orders
						<Badge
							class="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full"
						>
							6
						</Badge>
					</a>
					<a
						href="##"
						class="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<Package class="size-4" />
						Products
					</a>
					<a
						href="##"
						class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<Users class="size-4" />
						Customers
					</a>
					<a
						href="##"
						class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<ChartLine class="h-4 w-4" />
						Analytics
					</a>
				</nav>
			</div>
			<div class="mt-auto p-4">
				<Card.Root
					data-x-chunk-name="dashboard-02-chunk-0"
					data-x-chunk-description="A card with a call to action"
				>
					<Card.Header class="p-2 pt-0 md:p-4">
						<Card.Title>Upgrade to Pro</Card.Title>
						<Card.Description>
							Unlock all features and get unlimited access to our support team.
						</Card.Description>
					</Card.Header>
					<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" class="w-full">Upgrade</Button>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline" size="icon" class="shrink-0 md:hidden">
							<Menu class="size-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<Package2 class="size-6" />
							<span class="sr-only">Acme Inc</span>
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
						>
							<House class="size-5" />
							Dashboard
						</a>
						<a
							href="##"
							class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
						>
							<ShoppingCart class="size-5" />
							Orders
							<Badge
								class="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full"
							>
								6
							</Badge>
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
						>
							<Package class="size-5" />
							Products
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
						>
							<Users class="size-5" />
							Customers
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
						>
							<ChartLine class="size-5" />
							Analytics
						</a>
					</nav>
					<div class="mt-auto">
						<Card.Root>
							<Card.Header>
								<Card.Title>Upgrade to Pro</Card.Title>
								<Card.Description>
									Unlock all features and get unlimited access to our support
									team.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Button size="sm" class="w-full">Upgrade</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1">
				<form>
					<div class="relative">
						<Search class="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
						<Input
							type="search"
							placeholder="Search products..."
							class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
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
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<div class="flex items-center">
				<h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
			</div>
			<div
				data-x-chunk-name="dashboard-02-chunk-1"
				data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
				class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
			>
				<div class="flex flex-col items-center gap-1 text-center">
					<h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
					<p class="text-muted-foreground text-sm">
						You can start selling as soon as you add a product.
					</p>
					<Button class="mt-4">Add Product</Button>
				</div>
			</div>
		</main>
	</div>
</div>
