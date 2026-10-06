<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const retryIcon = {
		lucide: "RefreshCwIcon",
		tabler: "IconRefresh",
		hugeicons: "RefreshIcon",
		phosphor: "ArrowClockwiseIcon",
		remixicon: "RiRefreshLine",
	} as const;
	const states = [
		{
			state: "idle",
			name: "office-reference.jpg",
			horizontal: "Ready to upload",
			vertical: "Ready",
			src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
			alt: "Office",
		},
		{
			state: "uploading",
			name: "workspace.png",
			horizontal: "Uploading · 72%",
			vertical: "Uploading",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
			alt: "Workspace",
		},
		{
			state: "processing",
			name: "desk-reference.jpg",
			horizontal: "Processing image",
			vertical: "Processing",
			src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
			alt: "Desk",
		},
		{
			state: "error",
			name: "office-reference.jpg",
			horizontal: "Upload failed",
			vertical: "Failed",
			src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
			alt: "Office",
		},
		{
			state: "done",
			name: "workspace.png",
			horizontal: "Uploaded · 1.2 MB",
			vertical: "Done",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
			alt: "Workspace",
		},
	] as const;
</script>

<Example title="Image States" class="gap-8">
	<div class="flex w-full flex-col gap-3">
		<div class="px-1 text-xs font-medium text-muted-foreground">Horizontal</div>
		<div class="flex flex-col gap-2">
			{#each states as item, index (`${item.state}-${index}`)}
				<Attachment.Root state={item.state} class="w-full">
					<Attachment.Media variant="image"><img src={item.src} alt={item.alt} /></Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{item.name}</Attachment.Title>
						<Attachment.Description>{item.horizontal}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						{#if item.state === "error"}
							<Attachment.Action aria-label="Retry image upload">
								<IconPlaceholder {...retryIcon} />
							</Attachment.Action>
							<AttachmentRemove label="Remove attachment" />
						{:else}
							<AttachmentRemove label={`Remove ${item.name}`} />
						{/if}
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Vertical</div>
		<Attachment.Group class="w-full">
			{#each states as item, index (`${item.state}-${index}`)}
				<Attachment.Root state={item.state} orientation="vertical">
					<Attachment.Media variant="image"><img src={item.src} alt={item.alt} /></Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{item.name}</Attachment.Title>
						<Attachment.Description>{item.vertical}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						{#if item.state === "error"}
							<Attachment.Action aria-label="Retry office-reference.jpg">
								<IconPlaceholder {...retryIcon} />
							</Attachment.Action>
						{/if}
						<AttachmentRemove label={`Remove ${item.name}`} />
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</Attachment.Group>
	</div>
</Example>
