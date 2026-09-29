<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";

	const sides = ["top", "right", "bottom", "left"] as const;
</script>

<div class="grid w-full max-w-sm grid-cols-2 gap-4">
	{#each sides as side (side)}
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			>
				<span class="hidden pointer-fine:inline-block">Right click ({side})</span>
				<span class="hidden pointer-coarse:inline-block">Long press ({side})</span>
			</ContextMenu.Trigger>
			<ContextMenu.Content {side}>
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
	{/each}
</div>
