<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { RecordTable, type RecordTableColumn } from "$lib/registry/ui/record-table/index.js";

	type Company = { id: string; name: string; domain: string; stage: string; value: number };

	let companies = $state<Company[]>([
		{ id: "c1", name: "Acme Corp", domain: "acme.com", stage: "Customer", value: 12400 },
		{ id: "c2", name: "Globex", domain: "globex.io", stage: "Lead", value: 3200 },
		{ id: "c3", name: "Initech", domain: "initech.com", stage: "Customer", value: 8150 },
		{ id: "c4", name: "Umbrella", domain: "umbrella.co", stage: "Prospect", value: 0 },
		{ id: "c5", name: "Hooli", domain: "hooli.xyz", stage: "Lead", value: 560 },
		{ id: "c6", name: "Stark Industries", domain: "stark.com", stage: "Customer", value: 98000 },
	]);

	const tones: Record<string, "blue" | "gray" | "green"> = {
		Customer: "green",
		Lead: "blue",
		Prospect: "gray",
	};

	const columns: RecordTableColumn<Company>[] = [
		{ id: "name", header: "Name", accessor: (c) => c.name, width: "40%" },
		{ id: "domain", header: "Domain", accessor: (c) => c.domain },
		{ id: "stage", header: "Stage", accessor: (c) => c.stage, cell: stage },
		{ id: "value", header: "Value", accessor: (c) => c.value, align: "end", cell: money },
	];

	let filter = $state("");
	let selectedIds = $state<string[]>([]);
	let opened = $state("");
	let nextId = 7;

	function create(name: string) {
		companies.push({ id: `c${nextId++}`, name, domain: "", stage: "Lead", value: 0 });
	}
</script>

{#snippet stage({ value }: { value: unknown })}
	<Badge tone={tones[String(value)] ?? "gray"}>{value}</Badge>
{/snippet}

{#snippet money({ value }: { value: unknown })}
	{new Intl.NumberFormat("en-CA", {
		style: "currency",
		currency: "CAD",
		maximumFractionDigits: 0,
	}).format(Number(value))}
{/snippet}

<div class="flex w-full flex-col gap-3">
	<div class="flex items-center gap-3">
		<Input
			class="max-w-56"
			aria-label="Filter companies"
			placeholder="Filter"
			bind:value={filter}
		/>
		<span class="text-[13px] text-muted-foreground">
			{selectedIds.length} selected{opened ? ` · opened ${opened}` : ""}
		</span>
	</div>
	<div class="rounded-lg border">
		<RecordTable
			data={companies}
			{columns}
			getRowId={(c) => c.id}
			{filter}
			selectable
			bind:selectedIds
			stickyFirstColumn
			maxHeight="22rem"
			onRowClick={(c) => (opened = c.name)}
			onCreate={create}
			createPlaceholder="Company name"
			createLabel="Add company"
		/>
	</div>
</div>
