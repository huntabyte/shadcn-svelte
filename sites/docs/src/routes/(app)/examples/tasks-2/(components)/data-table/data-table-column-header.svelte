<script lang="ts" generics="T extends unknown | object | any[]">
	import type { Column } from "@tanstack/svelte-table";
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import EyeNone from "svelte-radix/EyeNone.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		column: Column<T, string>;
		title: string;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let column: Column<T, string>;
	export let title: $$Props["title"];
</script>

{#if !column.getCanSort()}
	<div class={cn(className)}>{title}</div>
{:else}
	{@const isSorted = column.getIsSorted()}
	<div class={cn("flex items-center space-x-2", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					size="sm"
					class="data-[state=open]:bg-accent -ml-3 h-8"
				>
					<span>{title}</span>
					{#if isSorted === "desc"}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if isSorted === "asc"}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<CaretSort class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item on:click={() => column.toggleSorting(false)}>
					<ArrowUp class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => column.toggleSorting(true)}>
					<ArrowDown class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={() => column.toggleVisibility(false)}>
					<EyeNone class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/if}
