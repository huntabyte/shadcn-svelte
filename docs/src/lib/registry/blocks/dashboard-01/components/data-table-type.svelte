<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import type { features } from "./data-table.svelte";
	import type { Schema } from "./schemas.js";
	import type { Row } from "@tanstack/svelte-table";

	let { row }: { row: Row<typeof features, Schema> } = $props();
</script>

<div class="w-32">
	<Badge variant="outline" class="px-1.5 text-muted-foreground">
		{row.original.type}
	</Badge>
</div>
