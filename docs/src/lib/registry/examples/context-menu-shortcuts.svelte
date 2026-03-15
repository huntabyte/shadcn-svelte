<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.Item>
			Back
			<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item disabled>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item>
			Reload
			<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Item>
			Save Page As...
			<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item>
			Print...
			<ContextMenu.Shortcut>⌘P</ContextMenu.Shortcut>
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
