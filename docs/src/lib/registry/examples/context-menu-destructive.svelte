<script lang="ts">
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Item>Edit</ContextMenu.Item>
		<ContextMenu.Item>Duplicate</ContextMenu.Item>
		<ContextMenu.Item>Archive</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Item class="text-destructive focus:text-destructive focus:bg-destructive/10">
			<Trash2Icon />
			Delete
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
