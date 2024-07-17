<script lang="ts">
	import EyeNone from "svelte-radix/EyeNone.svelte";
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import type { TableViewModel } from "svelte-headless-table";
	import type { Task } from "../(data)/schemas.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	let {
		tableModel,
		cellId,
		class: className,
		props: propsObj,
		children,
	}: PrimitiveDivAttributes & {
		props: {
			select: never;
			sort: {
				order: "desc" | "asc" | undefined;
				toggle: (_: Event) => void;
				clear: () => void;
				disabled: boolean;
			};
			filter: never;
		};
		tableModel: TableViewModel<Task>;
		cellId: string;
	} = $props();

	const { hiddenColumnIds } = tableModel.pluginStates.hide;

	function handleAscSort(e: Event) {
		if (propsObj.sort.order === "asc") {
			return;
		}
		propsObj.sort.toggle(e);
	}

	function handleDescSort(e: Event) {
		if (propsObj.sort.order === "desc") {
			return;
		}
		if (propsObj.sort.order === undefined) {
			// We can only toggle, so we toggle from undefined to 'asc' first
			propsObj.sort.toggle(e);
		}
		propsObj.sort.toggle(e); // Then we toggle from 'asc' to 'desc'
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

{#if !propsObj.sort.disabled}
	<div class={cn("flex items-center", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class={buttonVariants({
					variant: "ghost",
					size: "sm",
					class: "-ml-3 h-8 data-[state=open]:bg-accent",
				})}
			>
				{@render children?.()}
				{#if propsObj.sort.order === "desc"}
					<ArrowDown class="ml-2 size-4" />
				{:else if propsObj.sort.order === "asc"}
					<ArrowUp class="ml-2 size-4" />
				{:else}
					<CaretSort class="ml-2 size-4" />
				{/if}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item on:click={handleAscSort}>
					<ArrowUp class="mr-2 size-3.5 text-muted-foreground/70" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item on:click={handleDescSort}>
					<ArrowDown class="mr-2 size-3.5 text-muted-foreground/70" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={handleHide}>
					<EyeNone class="mr-2 size-3.5 text-muted-foreground/70" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{:else}
	{@render children?.()}
{/if}
