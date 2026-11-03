<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const icons = {
		file: {
			lucide: "FileTextIcon",
			tabler: "IconFileText",
			hugeicons: "FileIcon",
			phosphor: "FileTextIcon",
			remixicon: "RiFileTextLine",
		},
		table: {
			lucide: "TableIcon",
			tabler: "IconTable",
			hugeicons: "TableIcon",
			phosphor: "TableIcon",
			remixicon: "RiTableLine",
		},
		code: {
			lucide: "FileCodeIcon",
			tabler: "IconFileCode",
			hugeicons: "File01Icon",
			phosphor: "FileCodeIcon",
			remixicon: "RiFileCodeLine",
		},
		archive: {
			lucide: "FileArchiveIcon",
			tabler: "IconFileZip",
			hugeicons: "File01Icon",
			phosphor: "FileZipIcon",
			remixicon: "RiFileZipLine",
		},
	} as const;
	const horizontalItems = [
		{ name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", kind: "file" },
		{
			name: "workspace.png",
			meta: "PNG · 820 KB",
			kind: "image",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
			alt: "Workspace",
		},
		{ name: "customers.csv", meta: "CSV · 18 KB", kind: "table" },
		{ name: "renderer.tsx", meta: "TSX · 12 KB", kind: "code" },
	] as const;
	const verticalItems = [
		{ name: "invoice.pdf", meta: "PDF", kind: "file" },
		{
			name: "desk.jpg",
			meta: "JPG",
			kind: "image",
			src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
			alt: "Desk",
		},
		{ name: "assets.zip", meta: "ZIP", kind: "archive" },
		{
			name: "office.jpg",
			meta: "JPG",
			kind: "image",
			src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
			alt: "Office",
		},
		{ name: "notes.pdf", meta: "PDF", kind: "file" },
	] as const;
</script>

<Example title="Scrollable Group" class="gap-4">
	<Attachment.Group class="w-full">
		{#each horizontalItems as item (item.name)}
			<Attachment.Root class="w-64">
				{#if item.kind === "image"}
					<Attachment.Media variant="image"><img src={item.src} alt={item.alt} /></Attachment.Media>
				{:else}
					<Attachment.Media><IconPlaceholder {...icons[item.kind]} /></Attachment.Media>
				{/if}
				<Attachment.Content>
					<Attachment.Title>{item.name}</Attachment.Title>
					<Attachment.Description>{item.meta}</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions><AttachmentRemove label={`Remove ${item.name}`} /></Attachment.Actions>
			</Attachment.Root>
		{/each}
	</Attachment.Group>
	<Attachment.Group class="w-full">
		{#each verticalItems as item (item.name)}
			<Attachment.Root orientation="vertical">
				{#if item.kind === "image"}
					<Attachment.Media variant="image" class="aspect-square w-full">
						<img src={item.src} alt={item.alt} />
					</Attachment.Media>
				{:else}
					<Attachment.Media><IconPlaceholder {...icons[item.kind]} /></Attachment.Media>
				{/if}
				<Attachment.Content>
					<Attachment.Title>{item.name}</Attachment.Title>
					<Attachment.Description>{item.meta}</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions><AttachmentRemove label={`Remove ${item.name}`} /></Attachment.Actions>
			</Attachment.Root>
		{/each}
	</Attachment.Group>
</Example>
