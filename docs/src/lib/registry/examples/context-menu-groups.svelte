<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-56">
		<ContextMenu.Group>
			<ContextMenu.Label>Actions</ContextMenu.Label>
			<ContextMenu.Item>Copy</ContextMenu.Item>
			<ContextMenu.Item>Paste</ContextMenu.Item>
			<ContextMenu.Item>Duplicate</ContextMenu.Item>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.Label>Manage</ContextMenu.Label>
			<ContextMenu.Item>Rename</ContextMenu.Item>
			<ContextMenu.Item>Move to folder</ContextMenu.Item>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.Label>Danger zone</ContextMenu.Label>
			<ContextMenu.Item>Archive</ContextMenu.Item>
			<ContextMenu.Item>Delete</ContextMenu.Item>
		</ContextMenu.Group>
	</ContextMenu.Content>
</ContextMenu.Root>
