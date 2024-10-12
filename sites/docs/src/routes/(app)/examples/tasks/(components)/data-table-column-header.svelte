<script lang="ts">
	import EyeNone from "svelte-radix/EyeNone.svelte";
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Column } from "@tanstack/table-core";
	import type { WithoutChildren } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	type Props = HTMLAttributes<HTMLDivElement> & {
		column?: Column<any, any>;
		title?: string;
	};

	let { column, class: className, title, ...restProps }: WithoutChildren<Props> = $props();
</script>

{#if !column?.getCanSort()}
	<div class={className} {...restProps}>
		{title}
	</div>
{:else}
	<div class={cn("flex items-center", className)} {...restProps}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class={buttonVariants({
					variant: "ghost",
					size: "sm",
					class: "data-[state=open]:bg-accent -ml-3 h-8",
				})}
			>
				{title}
				{#if column.getIsSorted() === "desc"}
					<ArrowDown class="ml-2 size-4" />
				{:else if column.getIsSorted() === "asc"}
					<ArrowUp class="ml-2 size-4" />
				{:else}
					<CaretSort class="ml-2 size-4" />
				{/if}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item onclick={() => column.toggleSorting(false)}>
					<ArrowUp class="text-muted-foreground/70 mr-2 size-3.5" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => column.toggleSorting(true)}>
					<ArrowDown class="text-muted-foreground/70 mr-2 size-3.5" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={() => column.toggleVisibility(false)}>
					<EyeNone class="text-muted-foreground/70 mr-2 size-3.5" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/if}
