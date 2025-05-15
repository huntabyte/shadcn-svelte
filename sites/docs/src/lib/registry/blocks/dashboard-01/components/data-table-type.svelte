<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import type { Row } from "@tanstack/table-core";
	import type { Schema } from "./schemas.js";

	let { row }: { row: Row<Schema> } = $props();
</script>

<div class="w-32">
	<Badge variant="outline" class="text-muted-foreground px-1.5">
		{row.original.type}
	</Badge>
</div>
