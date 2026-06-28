<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import TableIcon from "@lucide/svelte/icons/table";
	import XIcon from "@lucide/svelte/icons/x";

	const items = [
		{ name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: FileTextIcon },
		{
			name: "workspace.png",
			meta: "PNG · 820 KB",
			src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
		},
		{ name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
		{ name: "renderer.tsx", meta: "TSX · 12 KB", icon: FileCodeIcon },
	];
</script>

<div class="mx-auto w-full max-w-sm py-12">
	<Attachment.Group class="w-full">
		{#each items as item (item.name)}
			<Attachment.Root class="w-64">
				{#if item.src}
					<Attachment.Media variant="image">
						<img src={item.src} alt={item.name} />
					</Attachment.Media>
				{:else if item.icon}
					{@const Icon = item.icon}
					<Attachment.Media>
						<Icon />
					</Attachment.Media>
				{/if}
				<Attachment.Content>
					<Attachment.Title>{item.name}</Attachment.Title>
					<Attachment.Description>{item.meta}</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action aria-label={`Remove ${item.name}`}>
						<XIcon />
					</Attachment.Action>
				</Attachment.Actions>
			</Attachment.Root>
		{/each}
	</Attachment.Group>
</div>
