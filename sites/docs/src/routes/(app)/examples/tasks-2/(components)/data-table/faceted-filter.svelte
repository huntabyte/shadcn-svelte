<script lang="ts">
	import type { Column } from "@tanstack/svelte-table";
	import Check from "svelte-radix/Check.svelte";
	import PlusCircled from "svelte-radix/PlusCircled.svelte";
	import type { Task } from "../../(data)/schema.js";
	import type { statuses } from "../../(data)/data.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	export let column: Column<Task> | undefined = undefined;
	export let title: string | undefined = undefined;
	export let options: typeof statuses;

	$: facets = column?.getFacetedUniqueValues();
	$: selectedValues = new Set(column?.getFilterValue() as string[]);

	function toggleOption(option: (typeof options)[0]) {
		if (selectedValues.has(option.value)) {
			selectedValues.delete(option.value);
		} else {
			selectedValues.add(option.value);
		}

		const filterValues = Array.from(selectedValues);
		column?.setFilterValue(filterValues.length ? filterValues : undefined);
	}

	function clearFilters() {
		column?.setFilterValue(undefined);
	}
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="sm" class="h-8 border-dashed">
			<PlusCircled class="mr-2 size-4" />
			{title}

			{#if selectedValues.size > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
					{selectedValues.size}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if selectedValues.size > 2}
						<Badge variant="secondary" class="rounded-sm px-1 font-normal">
							{selectedValues.size} selected
						</Badge>
					{:else}
						{#each options.filter( (option) => selectedValues.has(option.value) ) as option}
							<Badge
								variant="secondary"
								key={option.value}
								class="rounded-sm px-1 font-normal"
							>
								{option.label}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						{@const Icon = option.icon}
						{@const isSelected = selectedValues.has(option.value)}
						<Command.Item value={option.value} onSelect={() => toggleOption(option)}>
							<div
								class={cn(
									"border-primary mr-2 flex size-4 items-center justify-center rounded-sm border",
									isSelected
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check class={cn("size-4")} />
							</div>
							{#if option.icon}
								<Icon class="text-muted-foreground mr-2 size-4" />
							{/if}
							<span>{option.label}</span>
							{#if facets?.get(option.value)}
								<span
									class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
								>
									{facets.get(option.value)}
								</span>
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
				{#if selectedValues?.size > 0}
					<Command.Separator />
					<Command.Item class="justify-center text-center" onSelect={clearFilters}>
						Clear filters
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
