<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Attachment.Root>
		<Attachment.Media>
			<FileTextIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>sales-dashboard.pdf</Attachment.Title>
			<Attachment.Description>PDF - 2.4 MB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Download sales-dashboard.pdf">
				<DownloadIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root orientation="vertical" class="max-w-64">
		<Attachment.Media variant="image">
			<img
				src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
				alt="Workspace"
			/>
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>workspace.png</Attachment.Title>
			<Attachment.Description>Image - 1.1 MB</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
</div>
