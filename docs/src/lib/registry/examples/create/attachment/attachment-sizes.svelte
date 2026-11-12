<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const fileIcon = {
		lucide: "FileTextIcon",
		tabler: "IconFileText",
		hugeicons: "FileIcon",
		phosphor: "FileTextIcon",
		remixicon: "RiFileTextLine",
	} as const;
</script>

<Example title="Sizes" class="gap-3">
	<Attachment.Root size="default" class="w-full">
		<Attachment.Media><IconPlaceholder {...fileIcon} /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>Default attachment</Attachment.Title>
			<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root size="sm" class="w-full">
		<Attachment.Media><IconPlaceholder {...fileIcon} /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>Small attachment</Attachment.Title>
			<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root size="xs" class="w-full">
		<Attachment.Media><IconPlaceholder {...fileIcon} /></Attachment.Media>
		<Attachment.Content
			><Attachment.Title>Extra small attachment</Attachment.Title></Attachment.Content
		>
	</Attachment.Root>
</Example>
