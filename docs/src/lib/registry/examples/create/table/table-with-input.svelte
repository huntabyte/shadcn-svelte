<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Example title="With Input">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Product</Table.Head>
				<Table.Head>Quantity</Table.Head>
				<Table.Head>Price</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">Wireless Mouse</Table.Cell>
				<Table.Cell>
					<Input type="number" value="1" class="h-8 w-20" min="0" />
				</Table.Cell>
				<Table.Cell>$29.99</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">Mechanical Keyboard</Table.Cell>
				<Table.Cell>
					<Input type="number" value="2" class="h-8 w-20" min="0" />
				</Table.Cell>
				<Table.Cell>$129.99</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">USB-C Hub</Table.Cell>
				<Table.Cell>
					<Input type="number" value="1" class="h-8 w-20" min="0" />
				</Table.Cell>
				<Table.Cell>$49.99</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</Example>
