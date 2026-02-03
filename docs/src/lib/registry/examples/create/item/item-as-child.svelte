<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="asChild">
	<div class="flex w-full flex-col gap-4">
		<Item.Group>
			<Item.Root>
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Content>
							<Item.Title>Title Only (Link)</Item.Title>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root>
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Content>
							<Item.Title>Title + Description (Link)</Item.Title>
							<Item.Description>
								Clickable item with title and description.
							</Item.Description>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root>
				{#snippet child({ props })}
					<a href="#/" {...props}>
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
							<Item.Title>Media + Title (Link)</Item.Title>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root>
				{#snippet child({ props })}
					<a href="#/" {...props}>
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
							<Item.Title>Media + Title + Description (Link)</Item.Title>
							<Item.Description>
								Complete link item with media, title, and description.
							</Item.Description>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root>
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Content>
							<Item.Title>With Actions (Link)</Item.Title>
							<Item.Description>
								Link item that also has action buttons.
							</Item.Description>
						</Item.Content>
						<Item.Actions>
							<Button variant="outline" size="sm">Share</Button>
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
		</Item.Group>
	</div>
</Example>
