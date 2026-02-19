<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import ScissorsIcon from "@lucide/svelte/icons/scissors";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Item>
			<CopyIcon />
			Copy
		</ContextMenu.Item>
		<ContextMenu.Item>
			<ClipboardIcon />
			Paste
		</ContextMenu.Item>
		<ContextMenu.Item>
			<ScissorsIcon />
			Cut
		</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Item>
			<PencilIcon />
			Rename
		</ContextMenu.Item>
		<ContextMenu.Item>
			<Trash2Icon />
			Delete
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
