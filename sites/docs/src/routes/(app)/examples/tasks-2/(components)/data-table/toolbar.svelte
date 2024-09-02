<script lang="ts">
	import type { Table } from "@tanstack/svelte-table";
	import Cross2 from "svelte-radix/Cross2.svelte";
	import { type Readable } from "svelte/store";
	import type { Task } from "../../(data)/schema.js";
	import { priorities, statuses } from "../../(data)/data.js";
	import FacetedFilter from "./faceted-filter.svelte";
	import ViewOptions from "./view-options.svelte";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";

	export let table: Readable<Table<Task>>;

	const isFiltered = $table.getState().columnFilters.length > 0;
	let filterValue = $table.getColumn("title")?.getFilterValue();
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			bind:value={filterValue}
			on:input={() => $table.getColumn("title")?.setFilterValue(filterValue)}
			class="h-8 w-[150px] lg:w-[250px]"
		/>

		{#if $table.getColumn("status")}
			<FacetedFilter column={$table.getColumn("status")} title="Status" options={statuses} />
		{/if}

		{#if $table.getColumn("priority")}
			<FacetedFilter
				column={$table.getColumn("priority")}
				title="Priority"
				options={priorities}
			/>
		{/if}

		{#if isFiltered}
			<Button
				variant="ghost"
				on:click={() => $table.resetColumnFilters()}
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 size-4" />
			</Button>
		{/if}
	</div>

	<ViewOptions {table} />
</div>
