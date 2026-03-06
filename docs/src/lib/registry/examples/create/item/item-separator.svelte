<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="ItemSeparator">
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
					<Item.Title>Inbox</Item.Title>
					<Item.Description>View all incoming messages.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Separator />
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
					<Item.Title>Sent</Item.Title>
					<Item.Description>View all sent messages.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Separator />
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
					<Item.Title>Drafts</Item.Title>
					<Item.Description>View all draft messages.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Separator />
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
					<Item.Title>Archive</Item.Title>
					<Item.Description>View archived messages.</Item.Description>
				</Item.Content>
			</Item.Root>
		</Item.Group>
	</div>
</Example>
