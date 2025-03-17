<script lang="ts">
	import Ellipsis from "@lucide/svelte/icons/ellipsis";

	import { Badge } from "$lib/registry/default/ui/badge/index.js";

	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";

	import * as Table from "$lib/registry/default/ui/table/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-06-chunk-0"
	data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
>
	<Card.Header>
		<Card.Title>Products</Card.Title>
		<Card.Description>Manage your products and view their sales performance.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="hidden w-[100px] sm:table-cell">
						<span class="sr-only">Image</span>
					</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head class="hidden md:table-cell">Price</Table.Head>
					<Table.Head class="hidden md:table-cell">Total Sales</Table.Head>
					<Table.Head class="hidden md:table-cell">Created at</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product example"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Draft</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$499.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">25</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-07-12 10:42 AM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button {...props} size="icon" variant="ghost">
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Hypernova Headphones</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$129.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">100</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-10-18 03:21 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-haspopup="true"
										size="icon"
										variant="ghost"
									>
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">AeroGlow Desk Lamp</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$39.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">50</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-11-29 08:15 AM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-haspopup="true"
										size="icon"
										variant="ghost"
									>
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">TechTonic Energy Drink</Table.Cell>
					<Table.Cell>
						<Badge variant="secondary">Draft</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$2.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">0</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-12-25 11:59 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-haspopup="true"
										size="icon"
										variant="ghost"
									>
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Gamer Gear Pro Controller</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$59.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">75</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2024-01-01 12:00 AM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-haspopup="true"
										size="icon"
										variant="ghost"
									>
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Luminous VR Headset</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">Active</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">$199.99</Table.Cell>
					<Table.Cell class="hidden md:table-cell">30</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2024-02-14 02:14 PM</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-haspopup="true"
										size="icon"
										variant="ghost"
									>
										<Ellipsis class="size-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item>Delete</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-muted-foreground text-xs">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
