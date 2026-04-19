<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import ImageIcon from "@lucide/svelte/icons/image";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import VideoIcon from "@lucide/svelte/icons/video";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import type { Asset, AssetType } from "../data.js";

	let { asset }: { asset: Asset } = $props();

	const TYPE_LABEL: Record<AssetType, string> = {
		JPEG: "Image / JPEG",
		PNG: "Image / PNG",
		WEBP: "Image / WEBP",
		MP4: "Video / MP4",
		PDF: "Document / PDF",
	};
</script>

<Card.Root class="gap-0">
	<Card.Content class="flex flex-col gap-6">
		<div
			class="bg-muted/60 text-muted-foreground/60 ring-border/70 flex aspect-5/4 items-center justify-center ring-1 ring-inset"
		>
			{#if asset.type === "MP4"}
				<VideoIcon class="size-8" />
			{:else if asset.type === "PDF"}
				<FileTextIcon class="size-8" />
			{:else}
				<ImageIcon class="size-8" />
			{/if}
		</div>
		<h2 class="font-heading line-clamp-2 text-xl tracking-wide">{asset.name}</h2>
		<Separator />
		<dl class="flex flex-col gap-5 text-sm">
			<div class="flex flex-col gap-1.5">
				<dt
					class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
				>
					Asset Type
				</dt>
				<dd>{TYPE_LABEL[asset.type]}</dd>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-1.5">
					<dt
						class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
					>
						Dimensions
					</dt>
					<dd>{asset.dimensions}</dd>
				</div>
				<div class="flex flex-col gap-1.5">
					<dt
						class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
					>
						File Size
					</dt>
					<dd>{asset.size}</dd>
				</div>
			</div>
		</dl>
		<Separator />
		<div class="flex flex-col gap-3">
			<div class="flex items-center justify-between">
				<h3
					class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
				>
					Tags
				</h3>
				<Button variant="ghost" size="icon-xs" aria-label="Add tag">
					<PlusIcon />
				</Button>
			</div>
			<div class="flex flex-wrap gap-x-4 gap-y-2">
				{#each asset.tags as tag (tag)}
					<Badge>{tag}</Badge>
				{/each}
			</div>
		</div>
		<Separator />
		<div class="flex flex-col gap-3">
			<h3
				class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
			>
				Used In
			</h3>
			<div class="flex flex-col gap-2">
				{#each asset.usedIn as usage (usage.title)}
					<Item.Root variant="outline">
						<Item.Content>
							<Item.Title>{usage.title}</Item.Title>
							<Item.Description>{usage.role}</Item.Description>
						</Item.Content>
					</Item.Root>
				{/each}
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="mt-6 border-t pt-6">
		<Button class="w-full">
			<DownloadIcon data-icon="inline-start" />
			Download
		</Button>
	</Card.Footer>
</Card.Root>
