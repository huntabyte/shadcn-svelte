<script lang="ts">
	import {
		createTable,
		Subscribe,
		Render,
		createRender
	} from "svelte-headless-table";
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from "svelte-headless-table/plugins";
	import { readable } from "svelte/store";
	import * as Table from "@/registry/new-york/ui/table";
	import Actions from "./data-table-actions.svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { CaretSort, MixerHorizontal, CaretRight, CaretLeft, DoubleArrowLeft, DoubleArrowRight } from "radix-icons-svelte";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import * as Select from "@/registry/new-york/ui/select";
	import { cn } from "$lib/utils";
	import { Input } from "@/registry/new-york/ui/input";
	import DataTableCheckbox from "./data-table-checkbox.svelte";
	import Label from "@/registry/default/ui/label/label.svelte";

	type Payment = {
		id: string;
		amount: number;
		status: "Pending" | "Processing" | "Success" | "Failed";
		priority: "Low" | "Medium" | "High";
		//label: "Documentation" | "Bug" | "Feature";
		email: string;
	};

	const statuses = ["Pending", "Processing", "Success", "Failed"];
	const priorities = ["Low", "Medium", "High"];
	//const labels = ["Documentation", "Bug", "Feature"];

	const data: Payment[] = Array.from({ length: 100 }, (_, index) => ({
		id: Math.random().toString(36).substr(2, 9), // Generating a random ID
		amount: Math.floor(Math.random() * 1000), // Random amount between 0 and 999
		status: statuses[Math.floor(Math.random() * statuses.length)] as Payment["status"],
		priority: priorities[Math.floor(Math.random() * priorities.length)] as Payment["priority"],
		// label: labels[Math.floor(Math.random() * labels.length)] as Payment["label"],
		email: `user${index}@example.com`, // Example email
	}));

	const table = createTable(readable(data), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns(),
	});

	const columns = table.createColumns([
		table.column({
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			accessor: "id",
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: "Status",
			accessor: "status",
			plugins: { 
				sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: "Priority",
			accessor: "priority",
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({ header: "Email", accessor: "email" }),
		table.column({
			header: "Amount",
			accessor: "amount",
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value);
				return formatted;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: "Actions",
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(Actions, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		flatColumns,
		pluginStates,
		rows,
		visibleColumns
	} = table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const hideableCols = ["status", "email", "amount", "priority"];

	$: console.log("pluginStates", pluginStates);
</script>

<div class="w-full">
	<div class="mb-4 flex items-center gap-4">
		<Input
			class="max-w-sm"
			placeholder="Filter emails..."
			type="text"
			bind:value={$filterValue}
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:trigger>
				<Button variant="outline" class="ml-auto" builders={[trigger]}>
					<MixerHorizontal class="mr-2 h-4 w-4" /> View
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Label class="p-2 border-b">Toggle columns</DropdownMenu.Label>
				{#each flatColumns as col}
					{#if hideableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem
							bind:checked={hideForId[col.id]}
						>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<Table.Head
										{...attrs}
										class={cn(
											"[&:has([role=checkbox])]:pl-3"
										)}
									>
										{#if props.sort.disabled}
											<Render of={cell.render()} />
										{:else}
											<Button
												variant="ghost"
												on:click={props.sort.toggle}
											>
												<Render of={cell.render()} />
												<CaretSort
													class={cn(
														$sortKeys[0]?.id ===
															cell.id &&
															"text-foreground",
														"ml-2 h-4 w-4"
													)}
												/>
											</Button>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell
										class="[&:has([role=checkbox])]:pl-3"
										{...attrs}
									>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{" "}
			{$rows.length} row(s) selected.
		</div>
		<div class="flex items-center space-x-6 lg:space-x-8">
			<div class="flex items-center space-x-2">
				<Label class="flex items-center space-x-2">
					<p class="text-sm font-medium w-full">Rows per page</p>
					<Select.Root bind:value={$pageSize}>
						<Select.Trigger class="flex w-[70]">
						  <Select.Value placeholder={`${$pageSize}`} />
						</Select.Trigger>
						<Select.Content>
						  <Select.Item value={10}>10</Select.Item>
						  <Select.Item value={20}>20</Select.Item>
						  <Select.Item value={30}>30</Select.Item>
						  <Select.Item value={40}>40</Select.Item>
						  <Select.Item value={50}>50</Select.Item>
						</Select.Content>
					  </Select.Root>
				</Label>
			</div>
			<div class="w-100px items-center justify-center text-sm font-medium">
				<Label>Page {$pageIndex+1} of {$pageCount}</Label>
			</div>
			<div class="flex items-center space-x-2">
				<Button
					variant="outline"
					size="sm"
					on:click={() => ($pageIndex = 0)}
					disabled={!$hasPreviousPage}>
						<DoubleArrowLeft />
					</Button
				>
				<Button
					variant="outline"
					size="sm"
					on:click={() => ($pageIndex = $pageIndex - 1)}
					disabled={!$hasPreviousPage}>
						<CaretLeft />
					</Button
				>
				<Button
					variant="outline"
					size="sm"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageIndex + 1)}>
						<CaretRight />
					</Button
				>
				<Button
					variant="outline"
					size="sm"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageCount - 1)}>
						<DoubleArrowRight />
					</Button
				>
			</div>
		</div>
		
	</div>
</div>
