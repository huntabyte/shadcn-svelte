<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { groupItemsByType } from "../lib/utils.js";
	import { tick } from "svelte";
	import type { RegistryItem } from "@shadcn-svelte/registry";
	import { cn } from "$lib/utils.js";

	type Props = {
		items: Pick<RegistryItem, "name" | "title" | "type">[];
	};

	let { items }: Props = $props();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const groupedItems = $derived(groupItemsByType(items));

	const currentItem = $derived(items.find((item) => item.name === page.params.item));

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	function handleSelect(itemName: string) {
		goto(`/create/${itemName}${page.url.search}`);
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				size="sm"
				class="bg-muted/50 sm:bg-background md:dark:bg-background border-foreground/10 dark:bg-muted/50 data-[state=open]:bg-muted dark:data-[state=open]:bg-muted/50 h-13.5 flex-1 touch-manipulation justify-between gap-2 rounded-xl pr-4 pl-2.5 text-left shadow-none select-none sm:h-8 sm:max-w-56 sm:rounded-lg sm:pr-2 xl:max-w-md"
				role="combobox"
				aria-expanded={open}
			>
				<div class="flex flex-col justify-start text-left sm:hidden">
					<div class="text-muted-foreground text-xs font-normal">Preview</div>
					<div class="text-foreground text-sm font-medium">
						{currentItem?.title || "Select item..."}
					</div>
				</div>
				<div class="text-foreground hidden flex-1 text-sm sm:flex">
					{currentItem?.title || "Select item..."}
				</div>
				<SearchIcon class="size-4 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class={cn(
			"ring-foreground/10 min-w-[calc(var(--available-width)-var(--spacing)*4)] translate-x-2 rounded-xl border-0 p-0 ring-1 sm:min-w-[calc(var(--anchor-width)+var(--spacing)*7)] sm:translate-x-0",
			"**:data-[slot=command-input-wrapper]:rounded-lg **:data-[slot=command-input-wrapper]:border-b-0 [&_[data-slot=command-input-wrapper]]:p-1 [&_[data-slot=command-input-wrapper]_svg]:hidden"
		)}
		side="bottom"
		align="center"
	>
		<Command.Root value={page.params.item}>
			<Command.Input placeholder="Search..." />
			<Command.List class="no-scrollbar scroll-my-1 pb-1">
				<Command.Empty>No items found.</Command.Empty>
				{#each groupedItems as group (group.type)}
					<Command.Group heading={group.title}>
						{#each group.items as item (item.name)}
							<Command.Item
								value={item.name}
								onSelect={() => handleSelect(item.name)}
								class="group/combobox-item rounded-lg"
							>
								<CheckIcon
									class="size-4 {page.params.item !== item.name &&
										'text-transparent'}"
								/>
								{item.title}
								<span
									class="text-muted-foreground ml-auto text-xs opacity-0 group-data-[selected=true]/combobox-item:opacity-100"
								>
									{group.title}
								</span>
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
