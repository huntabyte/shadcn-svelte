<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Destructive Items">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Actions</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="PencilIcon"
					tabler="IconPencil"
					hugeicons="EditIcon"
					phosphor="PencilIcon"
				/>
				Edit
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="ShareIcon"
					tabler="IconShare"
					hugeicons="ShareIcon"
					phosphor="ShareIcon"
				/>
				Share
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="ArchiveIcon"
					tabler="IconArchive"
					hugeicons="Archive02Icon"
					phosphor="ArchiveIcon"
				/>
				Archive
			</DropdownMenu.Item>
			<DropdownMenu.Item variant="destructive">
				<IconPlaceholder
					lucide="TrashIcon"
					tabler="IconTrash"
					hugeicons="DeleteIcon"
					phosphor="TrashIcon"
				/>
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
