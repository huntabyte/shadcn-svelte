<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Destructive Items">
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
						lucide="PencilIcon"
						tabler="IconPencil"
						hugeicons="EditIcon"
						phosphor="PencilIcon"
						remixicon="RiPencilLine"
					/>
					Edit
				</ContextMenu.Item>
				<ContextMenu.Item>
					<IconPlaceholder
						lucide="ShareIcon"
						tabler="IconShare"
						hugeicons="ShareIcon"
						phosphor="ShareIcon"
						remixicon="RiShareLine"
					/>
					Share
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Item>
					<IconPlaceholder
						lucide="ArchiveIcon"
						tabler="IconArchive"
						hugeicons="Archive02Icon"
						phosphor="ArchiveIcon"
						remixicon="RiArchiveLine"
					/>
					Archive
				</ContextMenu.Item>
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
