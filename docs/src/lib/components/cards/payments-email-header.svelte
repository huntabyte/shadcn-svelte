<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { Column } from "@tanstack/table-core";
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";

	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	let { column }: { column: Column<Payment> } = $props();
</script>

<Button variant="ghost" onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
	Email
	<ArrowUpDownIcon />
</Button>
