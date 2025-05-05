<script lang="ts">
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import EllipsisVerticalIcon from "@lucide/svelte/icons/ellipsis-vertical";
	import ListFilterIcon from "@lucide/svelte/icons/list-filter";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	let {
		products,
	}: {
		products: {
			id: string;
			name: string;
			price: number;
			stock: number;
			dateAdded: string;
			status: string;
		}[];
	} = $props();

	let category = $state("all");
	let price = $state("$100-$200");
	let status = $state("all");
</script>

<Card.Root class="flex w-full flex-col gap-4">
	<Card.Header class="flex flex-row items-center justify-between">
		<Tabs.Root value="all">
			<Tabs.List class="@3xl/page:w-fit w-full">
				<Tabs.Trigger value="all">All Products</Tabs.Trigger>
				<Tabs.Trigger value="in-stock">In Stock</Tabs.Trigger>
				<Tabs.Trigger value="low-stock">Low Stock</Tabs.Trigger>
				<Tabs.Trigger value="add-product">
					{#snippet child({ props })}
						<button {...props}>
							<PlusIcon />
						</button>
					{/snippet}
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
		<div
			class="**:data-[slot=button]:size-8 **:data-[slot=select-trigger]:h-8 @3xl/page:flex hidden items-center gap-2"
		>
			<Select.Root type="single" bind:value={category}>
				<Select.Trigger class="capitalize">
					<span class="text-muted-foreground text-sm">Category:</span>
					{@const splitCategory = category.split("-")}
					{#if splitCategory.length === 2}
						{splitCategory[0] + " " + splitCategory[1]}
					{:else}
						{category ?? "Select a category"}
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="all">All</Select.Item>
					<Select.Item value="in-stock">In Stock</Select.Item>
					<Select.Item value="low-stock">Low Stock</Select.Item>
					<Select.Item value="archived">Archived</Select.Item>
				</Select.Content>
			</Select.Root>
			<Select.Root type="single" bind:value={price}>
				<Select.Trigger>
					<span class="text-muted-foreground text-sm">Price:</span>
					{#if price}
						{price}
					{:else}
						Select a price
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="$100-$200">$100-$200</Select.Item>
					<Select.Item value="$200-$300">$200-$300</Select.Item>
					<Select.Item value="$300-$400">$300-$400</Select.Item>
					<Select.Item value="$400-$500">$400-$500</Select.Item>
				</Select.Content>
			</Select.Root>
			<Select.Root type="single" bind:value={status}>
				<Select.Trigger>
					<span class="text-muted-foreground text-sm">Status:</span>
					{#if status}
						{@const splitStatus = status.split("-")}
						{#if splitStatus.length === 2}
							{splitStatus[0] + " " + splitStatus[1]}
						{:else}
							{status}
						{/if}
					{:else}
						Select a status
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="all">In Stock</Select.Item>
					<Select.Item value="in-stock">Low Stock</Select.Item>
					<Select.Item value="low-stock">Archived</Select.Item>
					<Select.Item value="archived">Archived</Select.Item>
				</Select.Content>
			</Select.Root>
			<Button variant="outline" size="icon">
				<ListFilterIcon />
			</Button>
			<Button variant="outline" size="icon">
				<ArrowUpDownIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-12 px-4">
						<Checkbox />
					</Table.Head>
					<Table.Head>Product</Table.Head>
					<Table.Head class="text-right">Price</Table.Head>
					<Table.Head class="text-right">Stock</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Date Added</Table.Head>
					<Table.Head />
				</Table.Row>
			</Table.Header>
			<Table.Body class="**:data-[slot=table-cell]:py-2.5">
				{#each products as product (product.id)}
					<Table.Row>
						<Table.Cell class="px-4">
							<Checkbox />
						</Table.Cell>
						<Table.Cell class="font-medium">{product.name}</Table.Cell>
						<Table.Cell class="text-right">
							${product.price.toFixed(2)}
						</Table.Cell>
						<Table.Cell class="text-right">{product.stock}</Table.Cell>
						<Table.Cell>
							<Badge
								variant="secondary"
								class={product.status === "Low Stock"
									? "border-orange-700 bg-transparent text-orange-700 dark:border-orange-700 dark:bg-transparent dark:text-orange-700"
									: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100"}
							>
								{product.status}
							</Badge>
						</Table.Cell>
						<Table.Cell>
							{new Date(product.dateAdded).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button
											variant="ghost"
											size="icon"
											class="size-6"
											{...props}
										>
											<EllipsisVerticalIcon />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
									<DropdownMenu.Item variant="destructive">
										Delete
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer
		class="@3xl/page:flex-row flex flex-col items-center justify-between border-t pt-6"
	>
		<div class="text-muted-foreground @3xl/page:block hidden text-sm">
			Showing 1-10 of 100 products
		</div>
		<Pagination.Root count={100} perPage={10} class="mx-0 w-fit">
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === "ellipsis"}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
