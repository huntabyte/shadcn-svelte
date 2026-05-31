<script lang="ts">
	import * as Command from "$lib/registry/ui/command/index.js";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { groupItemsByType } from "../lib/utils.js";
	import { examples } from "$lib/registry/examples/create/index.js";
	import type { Snippet } from "svelte";
	import { ActionMenuContext, ActionMenuCtx } from "./action-menu-context.svelte.js";

	let { children }: { children: Snippet } = $props();

	const actionMenuCtx = ActionMenuCtx.set(new ActionMenuContext());

	const commandPaletteExamples = $derived(
		examples.filter((example) => !example.hideFromCommandPalette)
	);
	const groupedItems = $derived(groupItemsByType(commandPaletteExamples));

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			e.stopPropagation();
			actionMenuCtx.open = !actionMenuCtx.open;
		}
	}

	function handleSelect(itemName: string) {
		goto(`/create/${itemName}${page.url.search}`);
		actionMenuCtx.open = false;
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open={actionMenuCtx.open} value={page.params.item} class="animate-none!">
	<Command.Input placeholder="Search" />
	<Command.List>
		<Command.Empty>No items found.</Command.Empty>
		<Command.Group>
			{#each groupedItems as group (group.type)}
				{#each group.items as item (item.name)}
					<Command.Item
						value={item.name}
						onSelect={() => handleSelect(item.name)}
						data-checked={page.params.item === item.name}
					>
						{item.title}
					</Command.Item>
				{/each}
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
{@render children?.()}
