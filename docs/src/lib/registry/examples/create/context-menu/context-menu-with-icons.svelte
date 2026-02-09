<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.Item>
					<IconPlaceholder
						lucide="CopyIcon"
						tabler="IconCopy"
						hugeicons="CopyIcon"
						phosphor="CopyIcon"
						remixicon="RiFileCopyLine"
					/>
					Copy
				</ContextMenu.Item>
				<ContextMenu.Item>
					<IconPlaceholder
						lucide="ScissorsIcon"
						tabler="IconCut"
						hugeicons="ScissorIcon"
						phosphor="ScissorsIcon"
						remixicon="RiScissorsLine"
					/>
					Cut
				</ContextMenu.Item>
				<ContextMenu.Item>
					<IconPlaceholder
						lucide="ClipboardPasteIcon"
						tabler="IconClipboard"
						hugeicons="ClipboardIcon"
						phosphor="ClipboardIcon"
						remixicon="RiClipboardLine"
					/>
					Paste
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Item variant="destructive">
					<IconPlaceholder
						lucide="TrashIcon"
						tabler="IconTrash"
						hugeicons="DeleteIcon"
						phosphor="TrashIcon"
						remixicon="RiDeleteBinLine"
					/>
					Delete
				</ContextMenu.Item>
			</ContextMenu.Group>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
