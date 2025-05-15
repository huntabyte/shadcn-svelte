<script lang="ts">
	import { useSortable } from "@dnd-kit-svelte/sortable";
	import type { Row } from "@tanstack/table-core";
	import type { Schema } from "./schemas.js";
	import { CSS } from "@dnd-kit-svelte/utilities";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { FlexRender } from "$lib/registry/ui/data-table/index.js";

	let { row }: { row: Row<Schema> } = $props();

	const { transform, transition, node, isDragging } = useSortable({
		id: () => row.original.id,
	});
</script>

<Table.Row
	data-state={row.getIsSelected() && "selected"}
	data-dragging={isDragging.current}
	bind:ref={node.current}
	class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
	style="transition: {transition.current}; transform: {CSS.Transform.toString(transform.current)}"
>
	{#each row.getVisibleCells() as cell (cell.id)}
		<Table.Cell>
			<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
		</Table.Cell>
	{/each}
</Table.Row>
