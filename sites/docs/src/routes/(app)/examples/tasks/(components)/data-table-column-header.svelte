<script lang="ts">
	import EyeNone from "svelte-radix/EyeNone.svelte";
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import type { TableViewModel } from "svelte-headless-table";
	import type { Task } from "../(data)/schemas.js";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let props: {
		select: never;
		sort: {
			order: "desc" | "asc" | undefined;
			toggle: (_: Event) => void;
			clear: () => void;
			disabled: boolean;
		};
		filter: never;
	};
	export let tableModel: TableViewModel<Task>;
	export let cellId: string;

	const { hiddenColumnIds } = tableModel.pluginStates.hide;

	function handleAscSort(e: Event) {
		if (props.sort.order === "asc") {
			return;
		}
		props.sort.toggle(e);
	}

	function handleDescSort(e: Event) {
		if (props.sort.order === "desc") {
			return;
		}
		if (props.sort.order === undefined) {
			// We can only toggle, so we toggle from undefined to 'asc' first
			props.sort.toggle(e);
		}
		props.sort.toggle(e); // Then we toggle from 'asc' to 'desc'
	}

	function handleHide() {
		hiddenColumnIds.update((ids: string[]) => {
			if (ids.includes(cellId)) {
				return ids;
			}
			return [...ids, cellId];
		});
	}
</script>

{#if !props.sort.disabled}
	<div class={cn("flex items-center", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="-ml-3 h-8 data-[state=open]:bg-accent"
					size="sm"
				>
					<slot />
					{#if props.sort.order === "desc"}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if props.sort.order === "asc"}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<CaretSort class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item on:click={handleAscSort}>
					<ArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item on:click={handleDescSort}>
					<ArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={handleHide}>
					<EyeNone class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{:else}
	<slot />
{/if}
