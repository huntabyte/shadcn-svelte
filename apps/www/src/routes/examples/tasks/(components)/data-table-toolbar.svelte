<script lang="ts">
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { MixerHorizontal } from "radix-icons-svelte";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";
	import type { HiddenColumnsState } from "svelte-headless-table/lib/plugins/addHiddenColumns";
	import type { FlatColumn } from "svelte-headless-table/lib/columns";
	import type { AnyPlugins } from "svelte-headless-table/lib/types/TablePlugin";
	import type { Task } from "../(data)/schemas";
	// TODO: Is this the right types??
	export let hideState: HiddenColumnsState;
	export let flatColumns: FlatColumn<Task, AnyPlugins, any>[];

	const { hiddenColumnIds } = hideState;

	const ids = flatColumns.map((col: { id: any }) => col.id);

	let hideForId = Object.fromEntries(ids.map((id: any) => [id, true]));

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
