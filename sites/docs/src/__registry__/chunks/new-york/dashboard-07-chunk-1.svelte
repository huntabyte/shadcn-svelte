<script lang="ts">
	import CirclePlus from "@lucide/svelte/icons/circle-plus";

	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";

	import * as Table from "$lib/registry/new-york/ui/table/index.js";

	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-1"
	data-x-chunk-description="A card with a form to edit the product stock and variants"
>
	<Card.Header>
		<Card.Title>Stock</Card.Title>
		<Card.Description>Lipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
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
						<ToggleGroup.Root type="single" value="s" variant="outline">
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
						<ToggleGroup.Root type="single" value="m" variant="outline">
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
						<ToggleGroup.Root type="single" value="s" variant="outline">
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
