<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import XIcon from "@lucide/svelte/icons/x";

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

<div class="mx-auto w-full max-w-sm py-12">
	<Attachment.Group class="w-full">
		{#each images as image (image.name)}
			<Attachment.Root orientation="vertical">
				<Attachment.Media variant="image">
					<img src={image.src} alt={image.alt} />
				</Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>{image.name}</Attachment.Title>
					<Attachment.Description>{image.meta}</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action aria-label={`Remove ${image.name}`}>
						<XIcon />
					</Attachment.Action>
				</Attachment.Actions>
				<Attachment.Trigger aria-label={`Open ${image.name}`}>
					{#snippet child({ props })}
						<a href={image.src} target="_blank" rel="noreferrer" {...props}></a>
					{/snippet}
				</Attachment.Trigger>
			</Attachment.Root>
		{/each}
	</Attachment.Group>
</div>
