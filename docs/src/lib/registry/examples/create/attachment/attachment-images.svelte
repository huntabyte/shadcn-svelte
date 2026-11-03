<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const images = [
		{
			name: "workspace.png",
			meta: "PNG · 820 KB",
			alt: "Workspace",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
		},
		{
			name: "desk-reference.jpg",
			meta: "JPG · 1.1 MB",
			alt: "Desk",
			src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
		},
		{
			name: "office-reference.jpg",
			meta: "JPG · 940 KB",
			alt: "Office",
			src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
		},
	];

	const extra = [
		{
			name: "patio-reference.jpg",
			meta: "JPG · 1.6 MB",
			alt: "Outdoor patio",
			src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80",
		},
		{
			name: "house-exterior.jpg",
			meta: "JPG · 1.4 MB",
			alt: "House exterior",
			src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80",
		},
	];
</script>

{#snippet ImageAttachment({
	image,
	orientation,
}: {
	image: (typeof images)[number];
	orientation?: "vertical";
})}
	<Attachment.Root {orientation} class={orientation ? undefined : "w-full"}>
		<Attachment.Media variant="image">
			<img src={image.src} alt={image.alt} />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>{image.name}</Attachment.Title>
			<Attachment.Description>{image.meta}</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<AttachmentRemove label={`Remove ${image.name}`} />
		</Attachment.Actions>
		<Attachment.Trigger>
			{#snippet child({ props })}
				<a
					href={image.src}
					target="_blank"
					rel="noreferrer"
					aria-label={`Open ${image.name}`}
					{...props}
				></a>
			{/snippet}
		</Attachment.Trigger>
	</Attachment.Root>
{/snippet}

<Example title="Images" class="gap-8">
	<div class="flex w-full flex-col gap-3">
		<div class="px-1 text-xs font-medium text-muted-foreground">Horizontal</div>
		<div class="flex flex-col gap-2">
			{#each images as image (image.name)}
				{@render ImageAttachment({ image })}
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Vertical</div>
		<Attachment.Group class="w-full">
			{#each [...images, ...extra] as image (`v-${image.name}`)}
				{@render ImageAttachment({ image, orientation: "vertical" })}
			{/each}
		</Attachment.Group>
	</div>
</Example>
