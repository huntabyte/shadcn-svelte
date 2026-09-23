<script lang="ts">
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import XIcon from "@lucide/svelte/icons/x";
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";

	const images = [
		{
			name: "workspace.png",
			meta: "PNG · 820 KB",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
			alt: "Workspace",
		},
		{
			name: "desk-reference.jpg",
			meta: "JPG · 1.1 MB",
			src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
			alt: "Desk",
		},
		{
			name: "office-reference.jpg",
			meta: "JPG · 940 KB",
			src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
			alt: "Office",
		},
	];
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
	<Attachment.Group>
		{#each images as image (image.name)}
			<Attachment.Root orientation="vertical">
				<Attachment.Media variant="image">
					<img src={image.src} alt={image.alt} />
				</Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>{image.name}</Attachment.Title>
					<Attachment.Description>{image.meta}</Attachment.Description>
				</Attachment.Content>
			</Attachment.Root>
		{/each}
	</Attachment.Group>
	<Attachment.Root state="uploading" class="w-full">
		<Attachment.Media>
			<Spinner />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>sales-dashboard.pdf</Attachment.Title>
			<Attachment.Description>Uploading · 64%</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Cancel upload">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root class="w-full">
		<Attachment.Media>
			<FileCodeIcon />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>message-renderer.tsx</Attachment.Title>
			<Attachment.Description>TypeScript · 12 KB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove message-renderer.tsx">
				<XIcon />
			</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
</div>
