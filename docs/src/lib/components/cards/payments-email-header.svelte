<script lang="ts">
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { features, Payment } from "./payments.svelte";
	import type { Column } from "@tanstack/svelte-table";

	let { column }: { column: Column<typeof features, Payment> } = $props();
</script>

<Button variant="ghost" onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
	Email
	<ArrowUpDownIcon />
</Button>
