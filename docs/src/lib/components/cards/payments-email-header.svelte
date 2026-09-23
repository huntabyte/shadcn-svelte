<script lang="ts">
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { PaymentsTableFeatures } from "./payments-features.js";
	import type { Column } from "@tanstack/svelte-table";

	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	let { column }: { column: Column<PaymentsTableFeatures, Payment, string> } = $props();
</script>

<Button variant="ghost" onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
	Email
	<ArrowUpDownIcon />
</Button>
