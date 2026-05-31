<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ItemVariant, ItemSize } from "$lib/registry/ui/item/item.svelte";

	type VariantConfig = {
		title: string;
		variant?: ItemVariant;
		size?: ItemSize;
	};

	const variants: VariantConfig[] = [
		{ title: "Default" },
		{ title: "Outline", variant: "outline" },
		{ title: "Muted", variant: "muted" },
		{ title: "Small", size: "sm" },
		{ title: "Outline - Small", variant: "outline", size: "sm" },
		{ title: "Muted - Small", variant: "muted", size: "sm" },
		{ title: "Extra Small", size: "xs" },
		{ title: "Outline - Extra Small", variant: "outline", size: "xs" },
		{ title: "Muted - Extra Small", variant: "muted", size: "xs" },
	];
</script>

{#each variants as { title, variant, size } (`${title}-${variant}-${size}`)}
	<Example {title}>
		<Item.Root {variant} {size}>
			<Item.Content>
				<Item.Title>Title Only</Item.Title>
			</Item.Content>
		</Item.Root>
		<Item.Root {variant} {size}>
			<Item.Content>
				<Item.Title>Title + Button</Item.Title>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size={size === "xs" || size === "sm" ? "sm" : undefined}
					>Action</Button
				>
			</Item.Actions>
		</Item.Root>
		<Item.Root {variant} {size}>
			<Item.Content>
				<Item.Title>Title + Description</Item.Title>
				<Item.Description>
					This is a description that provides additional context.
				</Item.Description>
			</Item.Content>
		</Item.Root>
		<Item.Root {variant} {size}>
			<Item.Content>
				<Item.Title>Title + Description + Button</Item.Title>
				<Item.Description>
					This item includes a title, description, and action button.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size={size === "xs" || size === "sm" ? "sm" : undefined}
					>Action</Button
				>
			</Item.Actions>
		</Item.Root>
		<Item.Root {variant} {size}>
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
				<Item.Title>Media + Title</Item.Title>
			</Item.Content>
		</Item.Root>
		<Item.Root {variant} {size}>
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
				<Item.Title>Media + Title + Button</Item.Title>
			</Item.Content>
			<Item.Actions>
				<Button size="sm">Action</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root {variant} {size}>
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
				<Item.Title>Media + Title + Description</Item.Title>
				<Item.Description
					>This item includes media, title, and description.</Item.Description
				>
			</Item.Content>
		</Item.Root>
		<Item.Root {variant} {size}>
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
				<Item.Title>Media + Title + Description + Button</Item.Title>
				<Item.Description>
					Complete item with all components: media, title, description, and button.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="sm">Action</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root {variant} {size}>
			<Item.Content>
				<Item.Title>Multiple Actions</Item.Title>
				<Item.Description>
					Item with multiple action buttons in the actions area.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size="sm">Cancel</Button>
				<Button size="sm">Confirm</Button>
			</Item.Actions>
		</Item.Root>
	</Example>
{/each}
