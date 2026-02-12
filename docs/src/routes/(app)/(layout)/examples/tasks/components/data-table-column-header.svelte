<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import type { Column } from "@tanstack/table-core";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import EyeOffIcon from "@lucide/svelte/icons/eye-off";
	import type { Task } from "../data/schemas.js";

	let {
		column,
		title,
		class: className,
		...restProps
	}: { column: Column<Task>; title: string } & HTMLAttributes<HTMLDivElement> = $props();
</script>

{#if !column?.getCanSort()}
	<div class={className} {...restProps}>
		{title}
	</div>
{:else}
	<div class={cn("flex items-center", className)} {...restProps}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="ghost"
						size="sm"
						class="data-[state=open]:bg-accent -ms-3 h-8"
					>
						<span>
							{title}
						</span>
						{#if column.getIsSorted() === "desc"}
							<ArrowDownIcon />
						{:else if column.getIsSorted() === "asc"}
							<ArrowUpIcon />
						{:else}
							<ChevronsUpDownIcon />
						{/if}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item onclick={() => column.toggleSorting(false)}>
					<ArrowUpIcon class="text-muted-foreground/70 me-2 size-3.5" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => column.toggleSorting(true)}>
					<ArrowDownIcon class="text-muted-foreground/70 me-2 size-3.5" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={() => column.toggleVisibility(false)}>
					<EyeOffIcon class="text-muted-foreground/70 me-2 size-3.5" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/if}
