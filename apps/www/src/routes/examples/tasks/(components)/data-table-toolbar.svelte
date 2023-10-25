<script lang="ts">
	import { Cross2 } from "radix-icons-svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { priorities, statuses } from "../(data)/data";
	import { MixerHorizontal } from "radix-icons-svelte";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import type { TableViewModel } from "svelte-headless-table/lib/createViewModel";

	export let hiddenColumnIds;

	export let tableModel: TableViewModel<{
		id: string;
		title: string;
		status: string;
		priority: string;
		label: string;
	}>;

	const { flatColumns } = tableModel;

	const ids = flatColumns.map((col) => col.id);

	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ["title", "status", "priority"];
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
		/>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				variant="outline"
				size="sm"
				class="ml-auto hidden h-8 lg:flex"
				builders={[builder]}
			>
				<MixerHorizontal class="mr-2 h-4 w-4" />
				View
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			{#each flatColumns as col}
				{#if hidableCols.includes(col.id)}
					<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
						{col.header}
					</DropdownMenu.CheckboxItem>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
