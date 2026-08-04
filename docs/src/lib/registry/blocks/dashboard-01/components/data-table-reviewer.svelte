<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import type { features } from "./data-table.svelte";
	import type { Schema } from "./schemas.js";
	import type { Row } from "@tanstack/svelte-table";

	let { row }: { row: Row<typeof features, Schema> } = $props();

	const isAssigned = $derived(row.original.reviewer !== "Assign reviewer");
	let reviewer = $state("");
</script>

{#if isAssigned}
	{row.original.reviewer}
{:else}
	<Label for="{row.original.id}-reviewer" class="sr-only">Reviewer</Label>
	<Select.Root type="single" bind:value={reviewer}>
		<Select.Trigger
			class="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
			size="sm"
			id="{row.original.id}-reviewer"
		>
			<span data-slot="select-value">
				{reviewer ?? "Assign reviewer"}
			</span>
		</Select.Trigger>
		<Select.Content align="end">
			<Select.Item value="Eddie Lake">Eddie Lake</Select.Item>
			<Select.Item value="Jamik Tashpulatov">Jamik Tashpulatov</Select.Item>
		</Select.Content>
	</Select.Root>
{/if}
