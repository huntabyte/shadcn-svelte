<script lang="ts">
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";

	let items = $state([
		{ id: "1", label: "Invoice #001", amount: "$250.00", checked: false },
		{ id: "2", label: "Invoice #002", amount: "$150.00", checked: true },
		{ id: "3", label: "Invoice #003", amount: "$350.00", checked: false },
		{ id: "4", label: "Invoice #004", amount: "$450.00", checked: false },
	]);

	let selectAll = $derived(items.every((item) => item.checked));

	function toggleAll() {
		const newValue = !selectAll;
		items = items.map((item) => ({ ...item, checked: newValue }));
	}
</script>

<div class="w-full max-w-sm rounded-md border">
	<div class="flex items-center gap-4 border-b px-4 py-3">
		<Checkbox checked={selectAll} onCheckedChange={toggleAll} aria-label="Select all" />
		<span class="flex-1 text-sm font-medium">Invoice</span>
		<span class="text-sm font-medium">Amount</span>
	</div>
	{#each items as item (item.id)}
		<div class="flex items-center gap-4 border-b px-4 py-3 last:border-b-0">
			<Checkbox bind:checked={item.checked} aria-label="Select row" />
			<span class="flex-1 text-sm">{item.label}</span>
			<span class="text-muted-foreground text-sm">{item.amount}</span>
		</div>
	{/each}
</div>
