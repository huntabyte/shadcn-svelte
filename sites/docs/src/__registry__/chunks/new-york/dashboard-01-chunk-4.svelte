<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	import * as Table from "$lib/registry/new-york/ui/table/index.js";
</script>

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
					<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
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
					<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
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
					<Table.Cell class="xl:table.-column hidden">Subscription</Table.Cell>
					<Table.Cell class="xl:table.-column hidden">
						<Badge class="text-xs" variant="outline">Approved</Badge>
					</Table.Cell>
					<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
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
					<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
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
					<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
						2023-06-27
					</Table.Cell>
					<Table.Cell class="text-right">$550.00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
