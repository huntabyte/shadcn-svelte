<script lang="ts">
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import House from "@lucide/svelte/icons/house";
	import ChartLine from "@lucide/svelte/icons/chart-line";
	import Package from "@lucide/svelte/icons/package";
	import Package2 from "@lucide/svelte/icons/package-2";
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import CirclePlus from "@lucide/svelte/icons/circle-plus";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import Upload from "@lucide/svelte/icons/upload";
	import UsersRound from "@lucide/svelte/icons/users-round";

	import { Badge } from "$lib/registry/default/ui/badge/index.js";
	import * as Breadcrumb from "$lib/registry/default/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import * as Select from "$lib/registry/default/ui/select/index.js";
	import * as Sheet from "$lib/registry/default/ui/sheet/index.js";
	import * as Table from "$lib/registry/default/ui/table/index.js";
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";
	import * as ToggleGroup from "$lib/registry/default/ui/toggle-group/index.js";
	import * as Tooltip from "$lib/registry/default/ui/tooltip/index.js";

	let category = $state("");
	let subCategory = $state("");
	let status = $state("");
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
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<ShoppingCart class="size-5" />
							Orders
						</a>
						<a href="##" class="text-foreground flex items-center gap-4 px-2.5">
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
						<Breadcrumb.Link href="##">Products</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Edit Product</Breadcrumb.Page>
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
							size="icon"
							variant="outline"
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
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
				<div class="flex items-center gap-4">
					<Button variant="outline" size="icon" class="size-7">
						<ChevronLeft class="size-4" />
						<span class="sr-only">Back</span>
					</Button>
					<h1
						class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
					>
						Pro Controller
					</h1>
					<Badge variant="outline" class="ml-auto sm:ml-0">In stock</Badge>
					<div class="hidden items-center gap-2 md:ml-auto md:flex">
						<Button variant="outline" size="sm">Discard</Button>
						<Button size="sm">Save Product</Button>
					</div>
				</div>
				<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-0"
							data-x-chunk-description="A card with a form to edit the product details"
						>
							<Card.Header>
								<Card.Title>Product Details</Card.Title>
								<Card.Description>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-6">
									<div class="grid gap-3">
										<Label for="name">Name</Label>
										<Input
											id="name"
											type="text"
											class="w-full"
											value="Gamer Gear Pro Controller"
										/>
									</div>
									<div class="grid gap-3">
										<Label for="description">Description</Label>
										<Textarea
											id="description"
											value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
											class="min-h-32"
										/>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-1"
							data-x-chunk-description="A card with a form to edit the product stock and variants"
						>
							<Card.Header>
								<Card.Title>Stock</Card.Title>
								<Card.Description>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head class="w-[100px]">SKU</Table.Head>
											<Table.Head>Stock</Table.Head>
											<Table.Head>Price</Table.Head>
											<Table.Head class="w-[100px]">Size</Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell class="font-semibold">GGPC-001</Table.Cell>
											<Table.Cell>
												<Label for="stock-1" class="sr-only">Stock</Label>
												<Input id="stock-1" type="number" value="100" />
											</Table.Cell>
											<Table.Cell>
												<Label for="price-1" class="sr-only">Price</Label>
												<Input id="price-1" type="number" value="99.99" />
											</Table.Cell>
											<Table.Cell>
												<ToggleGroup.Root
													type="single"
													value="s"
													variant="outline"
												>
													<ToggleGroup.Item value="s">S</ToggleGroup.Item>
													<ToggleGroup.Item value="m">M</ToggleGroup.Item>
													<ToggleGroup.Item value="l">L</ToggleGroup.Item>
												</ToggleGroup.Root>
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell class="font-semibold">GGPC-002</Table.Cell>
											<Table.Cell>
												<Label for="stock-2" class="sr-only">Stock</Label>
												<Input id="stock-2" type="number" value="143" />
											</Table.Cell>
											<Table.Cell>
												<Label for="price-2" class="sr-only">Price</Label>
												<Input id="price-2" type="number" value="99.99" />
											</Table.Cell>
											<Table.Cell>
												<ToggleGroup.Root
													type="single"
													value="m"
													variant="outline"
												>
													<ToggleGroup.Item value="s">S</ToggleGroup.Item>
													<ToggleGroup.Item value="m">M</ToggleGroup.Item>
													<ToggleGroup.Item value="l">L</ToggleGroup.Item>
												</ToggleGroup.Root>
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell class="font-semibold">GGPC-003</Table.Cell>
											<Table.Cell>
												<Label for="stock-3" class="sr-only">Stock</Label>
												<Input id="stock-3" type="number" value="32" />
											</Table.Cell>
											<Table.Cell>
												<Label for="price-3" class="sr-only">Stock</Label>
												<Input id="price-3" type="number" value="99.99" />
											</Table.Cell>
											<Table.Cell>
												<ToggleGroup.Root
													type="single"
													value="s"
													variant="outline"
												>
													<ToggleGroup.Item value="s">S</ToggleGroup.Item>
													<ToggleGroup.Item value="m">M</ToggleGroup.Item>
													<ToggleGroup.Item value="l">L</ToggleGroup.Item>
												</ToggleGroup.Root>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table.Root>
							</Card.Content>
							<Card.Footer class="justify-center border-t p-4">
								<Button size="sm" variant="ghost" class="gap-1">
									<CirclePlus class="size-3.5" />
									Add Variant
								</Button>
							</Card.Footer>
						</Card.Root>
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-2"
							data-x-chunk-description="A card with a form to edit the product category and subcategory"
						>
							<Card.Header>
								<Card.Title>Product Category</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-6 sm:grid-cols-3">
									<div class="grid gap-3">
										<Label for="category">Category</Label>
										<Select.Root type="single" bind:value={category}>
											<Select.Trigger
												id="category"
												aria-label="Select category"
												class="capitalize"
											>
												{category ?? "Select category"}
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="clothing" label="Clothing" />
												<Select.Item
													value="electronics"
													label="Electronics"
												/>
												<Select.Item
													value="accessories"
													label="Accessories"
												/>
											</Select.Content>
										</Select.Root>
									</div>
									<div class="grid gap-3">
										<Label for="subcategory">Subcategory (optional)</Label>
										<Select.Root type="single" bind:value={subCategory}>
											<Select.Trigger
												id="subcategory"
												aria-label="Select subcategory"
												class="capitalize"
											>
												{subCategory ?? "Select subcategory"}
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="t-shirts" label="T-Shirts" />
												<Select.Item value="hoodies" label="Hoodies" />
												<Select.Item
													value="sweatshirts"
													label="Sweatshirts"
												/>
											</Select.Content>
										</Select.Root>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-3"
							data-x-chunk-description="A card with a form to edit the product status"
						>
							<Card.Header>
								<Card.Title>Product Status</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-6">
									<div class="grid gap-3">
										<Label for="status">Status</Label>
										<Select.Root type="single" bind:value={status}>
											<Select.Trigger
												id="status"
												aria-label="Select status"
												class="capitalize"
											>
												{status ?? "Select status"}
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="draft" label="Draft" />
												<Select.Item value="published" label="Active" />
												<Select.Item value="archived" label="Archived" />
											</Select.Content>
										</Select.Root>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
						<Card.Root
							class="overflow-hidden"
							data-x-chunk-name="dashboard-07-chunk-4"
							data-x-chunk-description="A card with a form to upload product images"
						>
							<Card.Header>
								<Card.Title>Product Images</Card.Title>
								<Card.Description>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-2">
									<img
										alt="Product"
										class="aspect-square w-full rounded-md object-cover"
										height="300"
										src="/images/placeholder.svg"
										width="300"
									/>
									<div class="grid grid-cols-3 gap-2">
										<button aria-label="Product">
											<img
												alt="Product"
												class="aspect-square w-full rounded-md object-cover"
												height="84"
												src="/images/placeholder.svg"
												width="84"
											/>
										</button>
										<button aria-label="Product">
											<img
												alt="Product"
												class="aspect-square w-full rounded-md object-cover"
												height="84"
												src="/images/placeholder.svg"
												width="84"
											/>
										</button>
										<button
											class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
										>
											<Upload class="text-muted-foreground size-4" />
											<span class="sr-only">Upload</span>
										</button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
						<Card.Root
							data-x-chunk-name="dashboard-07-chunk-5"
							data-x-chunk-description="A card with a call to action to archive the product"
						>
							<Card.Header>
								<Card.Title>Archive Product</Card.Title>
								<Card.Description>
									Lipsum dolor sit amet, consectetur adipiscing elit.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<div></div>
								<Button size="sm" variant="secondary">Archive Product</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
				<div class="flex items-center justify-center gap-2 md:hidden">
					<Button variant="outline" size="sm">Discard</Button>
					<Button size="sm">Save Product</Button>
				</div>
			</div>
		</main>
	</div>
</div>
