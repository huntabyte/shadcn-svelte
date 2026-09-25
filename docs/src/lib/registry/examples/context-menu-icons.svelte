<script lang="ts">
	import ClipboardPasteIcon from "@lucide/svelte/icons/clipboard-paste";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import ScissorsIcon from "@lucide/svelte/icons/scissors";
	import TrashIcon from "@lucide/svelte/icons/trash";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
	>
		<span class="hidden pointer-fine:inline-block">Right click here</span>
		<span class="hidden pointer-coarse:inline-block">Long press here</span>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Group>
			<ContextMenu.Item>
				<CopyIcon />
				Copy
			</ContextMenu.Item>
			<ContextMenu.Item>
				<ScissorsIcon />
				Cut
			</ContextMenu.Item>
			<ContextMenu.Item>
				<ClipboardPasteIcon />
				Paste
			</ContextMenu.Item>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.Item variant="destructive">
				<TrashIcon />
				Delete
			</ContextMenu.Item>
		</ContextMenu.Group>
	</ContextMenu.Content>
</ContextMenu.Root>
