<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const files = [
		{
			name: "sales-dashboard.pdf",
			meta: "PDF · 2.4 MB",
			icon: {
				lucide: "FileTextIcon",
				tabler: "IconFileText",
				hugeicons: "FileIcon",
				phosphor: "FileTextIcon",
				remixicon: "RiFileTextLine",
			},
		},
		{
			name: "customer-import.csv",
			meta: "CSV · 18 KB",
			icon: {
				lucide: "TableIcon",
				tabler: "IconTable",
				hugeicons: "TableIcon",
				phosphor: "TableIcon",
				remixicon: "RiTableLine",
			},
		},
		{
			name: "message-renderer.tsx",
			meta: "TypeScript · 12 KB",
			icon: {
				lucide: "FileCodeIcon",
				tabler: "IconFileCode",
				hugeicons: "File01Icon",
				phosphor: "FileCodeIcon",
				remixicon: "RiFileCodeLine",
			},
		},
	] as const;

	const verticalFiles = [
		...files,
		{
			name: "source-assets.zip",
			meta: "ZIP · 4.2 MB",
			icon: {
				lucide: "FileArchiveIcon",
				tabler: "IconFileZip",
				hugeicons: "File01Icon",
				phosphor: "FileZipIcon",
				remixicon: "RiFileZipLine",
			},
		},
		{
			name: "quarterly-review.key",
			meta: "Keynote · 9 MB",
			icon: {
				lucide: "PresentationIcon",
				tabler: "IconPresentation",
				hugeicons: "Presentation01Icon",
				phosphor: "PresentationIcon",
				remixicon: "RiSlideshowLine",
			},
		},
	] as const;
</script>

<Example title="Files" class="gap-8">
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Horizontal</div>
		<div class="flex flex-col gap-3">
			{#each files as file (file.name)}
				<Attachment.Root class="w-full">
					<Attachment.Media><IconPlaceholder {...file.icon} /></Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{file.name}</Attachment.Title>
						<Attachment.Description>{file.meta}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						<AttachmentRemove label={`Remove ${file.name}`} />
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Vertical</div>
		<Attachment.Group class="w-full">
			{#each verticalFiles as file (file.name)}
				<Attachment.Root orientation="vertical">
					<Attachment.Media><IconPlaceholder {...file.icon} /></Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{file.name}</Attachment.Title>
						<Attachment.Description>{file.meta}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						<AttachmentRemove label={`Remove ${file.name}`} />
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</Attachment.Group>
	</div>
</Example>
