<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import CircleCheckFilledIcon from "@tabler/icons-svelte/icons/circle-check-filled";
	import LoaderIcon from "@tabler/icons-svelte/icons/loader";
	import type { Row } from "@tanstack/table-core";
	import type { Schema } from "./schemas.js";

	let { row }: { row: Row<Schema> } = $props();
</script>

<Badge variant="outline" class="text-muted-foreground px-1.5">
	{#if row.original.status === "Done"}
		<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
	{:else}
		<LoaderIcon />
	{/if}
	{row.original.status}
</Badge>
