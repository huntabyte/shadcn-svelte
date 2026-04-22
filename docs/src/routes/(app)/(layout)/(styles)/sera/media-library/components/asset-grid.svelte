<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import ImageIcon from "@lucide/svelte/icons/image";
	import SearchIcon from "@lucide/svelte/icons/search";
	import VideoIcon from "@lucide/svelte/icons/video";
	import { cn } from "$lib/utils.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import { ASSETS, type AssetType } from "../data.js";

	let {
		selectedId,
		onSelect,
	}: {
		selectedId: string;
		onSelect: (id: string) => void;
	} = $props();
</script>

{#snippet AssetTypeIcon({ type, className }: { type: AssetType; className?: string })}
	{#if type === "MP4"}
		<VideoIcon class={className} />
	{:else if type === "PDF"}
		<FileTextIcon class={className} />
	{:else}
		<ImageIcon class={className} />
	{/if}
{/snippet}

<Card.Root>
	<Card.Header>
		<InputGroup.Root class="w-full">
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Input placeholder="Search files, tags, or metadata..." />
		</InputGroup.Root>
	</Card.Header>
	<Card.Content>
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
			{#each ASSETS as asset (asset.id)}
				{@const selected = asset.id === selectedId}
				<button
					type="button"
					onclick={() => onSelect(asset.id)}
					aria-pressed={selected}
					class="group focus-visible:[&>div:first-child]:ring-ring flex flex-col gap-2.5 text-left outline-none focus-visible:[&>div:first-child]:ring-2"
				>
					<div
						class={cn(
							"bg-muted/60 ring-border/70 group-hover:ring-foreground/40 relative flex aspect-4/3 items-center justify-center ring-1 transition-shadow ring-inset",
							selected && "ring-foreground group-hover:ring-foreground ring-2"
						)}
					>
						{#if selected}
							<div
								class="bg-foreground text-background absolute top-2 left-2 flex size-5 items-center justify-center"
							>
								<CheckIcon class="size-3" />
							</div>
						{/if}
						<Badge
							variant="outline"
							class="bg-background absolute top-2 right-2 border px-2 py-1 text-[0.625rem]"
						>
							{asset.type}
						</Badge>
						{#if asset.duration}
							<Badge
								class="bg-foreground text-background absolute bottom-2 left-2 px-2 py-1"
							>
								{asset.duration}
							</Badge>
						{/if}
						{@render AssetTypeIcon({
							type: asset.type,
							className: "size-7 text-muted-foreground/60",
						})}
					</div>
					<div class="flex flex-col gap-0.5 px-0.5">
						<p class="line-clamp-1 text-sm font-medium">{asset.name}</p>
						<p
							class="text-muted-foreground text-[0.625rem] font-semibold tracking-wider uppercase"
						>
							{asset.date} · {asset.size}
						</p>
					</div>
				</button>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer class="justify-center">
		<Pagination.Root count={30}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === "ellipsis"}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
