<script lang="ts">
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MoreVerticalIcon from "@lucide/svelte/icons/more-vertical";
	import SearchIcon from "@lucide/svelte/icons/search";
	import VideoIcon from "@lucide/svelte/icons/video";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { SvelteSet } from "svelte/reactivity";
	import { ASSETS, type AssetType } from "../../media-library/data.js";

	let selectedIds = new SvelteSet(["1"]);

	function toggleSelection(id: string) {
		if (selectedIds.has(id)) {
			selectedIds.delete(id);
		} else {
			selectedIds.add(id);
		}
	}
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
	<Card.Content class="px-0 py-0">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-10 pl-6" aria-label="Select" />
					<Table.Head class="w-20" aria-label="Preview" />
					<Table.Head>Filename</Table.Head>
					<Table.Head>Type</Table.Head>
					<Table.Head>Dimensions</Table.Head>
					<Table.Head>Size</Table.Head>
					<Table.Head>Uploaded By</Table.Head>
					<Table.Head>Date</Table.Head>
					<Table.Head class="w-10 pr-6" aria-label="Actions" />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each ASSETS as asset (asset.id)}
					{@const isSelected = selectedIds.has(asset.id)}
					<Table.Row
						data-state={isSelected ? "selected" : undefined}
						class="cursor-pointer"
						onclick={() => toggleSelection(asset.id)}
					>
						<Table.Cell class="pl-6">
							<Checkbox
								checked={isSelected}
								aria-label={`Select ${asset.name}`}
								onclick={(e) => e.stopPropagation()}
								onCheckedChange={() => toggleSelection(asset.id)}
							/>
						</Table.Cell>
						<Table.Cell>
							<div
								class="bg-muted/60 ring-border/70 relative flex aspect-4/3 w-16 items-center justify-center ring-1 ring-inset"
							>
								{#if asset.duration}
									<span
										class="bg-foreground/90 text-background absolute right-1 bottom-1 px-1 text-[0.5rem] font-semibold tracking-wider"
									>
										{asset.duration}
									</span>
								{/if}
								{@render AssetTypeIcon({
									type: asset.type,
									className: "size-4 text-muted-foreground/60",
								})}
							</div>
						</Table.Cell>
						<Table.Cell class="text-foreground text-sm font-medium"
							>{asset.name}</Table.Cell
						>
						<Table.Cell>
							<Badge variant="outline" class="border px-2 py-0.5 text-[0.625rem]">
								{asset.type}
							</Badge>
						</Table.Cell>
						<Table.Cell class="text-sm">{asset.dimensions}</Table.Cell>
						<Table.Cell class="text-sm">{asset.size}</Table.Cell>
						<Table.Cell>{asset.uploadedBy}</Table.Cell>
						<Table.Cell
							class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
						>
							{asset.date}
						</Table.Cell>
						<Table.Cell class="pr-6 text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											variant="ghost"
											size="icon-xs"
											aria-label={`Open actions for ${asset.name}`}
											onclick={(e) => e.stopPropagation()}
										>
											<MoreVerticalIcon />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Item>Preview</DropdownMenu.Item>
									<DropdownMenu.Item>Download</DropdownMenu.Item>
									<DropdownMenu.Item variant="destructive"
										>Delete</DropdownMenu.Item
									>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer class="justify-center py-4">
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
