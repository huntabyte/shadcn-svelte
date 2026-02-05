<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Outline - ItemGroup">
	<div class="flex w-full flex-col gap-4">
		<Item.Group>
			<Item.Root variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="InboxIcon"
						tabler="IconArchive"
						hugeicons="Archive02Icon"
						phosphor="ArchiveIcon"
						remixicon="RiArchiveLine"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title>Item 1</Item.Title>
					<Item.Description>First item with icon.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Root variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="InboxIcon"
						tabler="IconArchive"
						hugeicons="Archive02Icon"
						phosphor="ArchiveIcon"
						remixicon="RiArchiveLine"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title>Item 2</Item.Title>
					<Item.Description>Second item with icon.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Root variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="InboxIcon"
						tabler="IconArchive"
						hugeicons="Archive02Icon"
						phosphor="ArchiveIcon"
						remixicon="RiArchiveLine"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title>Item 3</Item.Title>
					<Item.Description>Third item with icon.</Item.Description>
				</Item.Content>
			</Item.Root>
		</Item.Group>
	</div>
</Example>
