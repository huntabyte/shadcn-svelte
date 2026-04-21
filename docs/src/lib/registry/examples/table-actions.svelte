<script lang="ts">
	import MoreHorizontalIcon from "@lucide/svelte/icons/ellipsis";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";

	const products = [
		{ name: "Wireless Mouse", price: "$29.99" },
		{ name: "Mechanical Keyboard", price: "$129.99" },
		{ name: "USB-C Hub", price: "$49.99" },
	];
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Product</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head class="text-end">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each products as product (product.name)}
			<Table.Row>
				<Table.Cell class="font-medium">{product.name}</Table.Cell>
				<Table.Cell>{product.price}</Table.Cell>
				<Table.Cell class="text-end">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button {...props} variant="ghost" size="icon" class="size-8">
									<MoreHorizontalIcon />
									<span class="sr-only">Open menu</span>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item>Edit</DropdownMenu.Item>
							<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
