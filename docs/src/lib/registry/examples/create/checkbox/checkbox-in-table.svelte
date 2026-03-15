<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { SvelteSet } from "svelte/reactivity";

	const tableData = [
		{
			id: "1",
			name: "Sarah Chen",
			email: "sarah.chen@example.com",
			role: "Admin",
		},
		{
			id: "2",
			name: "Marcus Rodriguez",
			email: "marcus.rodriguez@example.com",
			role: "User",
		},
		{
			id: "3",
			name: "Priya Patel",
			email: "priya.patel@example.com",
			role: "User",
		},
		{
			id: "4",
			name: "David Kim",
			email: "david.kim@example.com",
			role: "Editor",
		},
	];

	let selectedRows = new SvelteSet(["1"]);

	const selectAll = $derived(selectedRows.size === tableData.length);

	function handleSelectAll(checked: boolean | "indeterminate") {
		if (checked === true) {
			for (const row of tableData) {
				selectedRows.add(row.id);
			}
		} else {
			selectedRows.clear();
		}
	}

	function handleSelectRow(id: string, checked: boolean | "indeterminate") {
		if (checked === true) {
			selectedRows.add(id);
		} else {
			selectedRows.delete(id);
		}
	}
</script>

<Example title="In Table">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-8">
					<Checkbox.Root
						id="select-all"
						checked={selectAll}
						indeterminate={!selectAll && selectedRows.size > 0}
						onCheckedChange={handleSelectAll}
					/>
				</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each tableData as row (row.id)}
				<Table.Row data-state={selectedRows.has(row.id) ? "selected" : undefined}>
					<Table.Cell>
						<Checkbox.Root
							id={`row-${row.id}`}
							checked={selectedRows.has(row.id)}
							onCheckedChange={(checked) => handleSelectRow(row.id, checked)}
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">{row.name}</Table.Cell>
					<Table.Cell>{row.email}</Table.Cell>
					<Table.Cell>{row.role}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Example>
