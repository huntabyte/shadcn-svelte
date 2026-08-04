<script lang="ts">
	import CircleCheckFilledIcon from "@tabler/icons-svelte/icons/circle-check-filled";
	import LoaderIcon from "@tabler/icons-svelte/icons/loader";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import type { features } from "./data-table.svelte";
	import type { Schema } from "./schemas.js";
	import type { Row } from "@tanstack/svelte-table";

	let { row }: { row: Row<typeof features, Schema> } = $props();
</script>

<Badge variant="outline" class="px-1.5 text-muted-foreground">
	{#if row.original.status === "Done"}
		<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
	{:else}
		<LoaderIcon />
	{/if}
	{row.original.status}
</Badge>
