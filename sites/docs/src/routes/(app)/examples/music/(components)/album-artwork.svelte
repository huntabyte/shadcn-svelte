<script lang="ts">
	import CirclePlus from "@lucide/svelte/icons/circle-plus";
	import type { Album } from "../(data)/albums.js";
	import { playlists } from "../(data)/playlists.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	import * as ContextMenu from "$lib/registry/new-york/ui/context-menu/index.js";

	type Props = {
		album: Album;
		aspectRatio?: "portrait" | "square";
		width: number;
		height: number;
	} & PrimitiveDivAttributes;

	let {
		album,
		class: className,
		aspectRatio = "square",
		width,
		height,
		...restProps
	}: Props = $props();
</script>

<div class={cn("space-y-3", className)} {...restProps}>
	<ContextMenu.Root>
		<ContextMenu.Trigger>
			<div class="overflow-hidden rounded-md">
				<img
					class={cn(
						"h-auto w-auto object-cover transition-all hover:scale-105",
						`w-[${width}px]`,
						`h-[${height}px]`,
						aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
					)}
					src={album.cover}
					alt={album.name}
				/>
			</div>
		</ContextMenu.Trigger>
		<ContextMenu.Content class="w-40">
			<ContextMenu.Item>Add to Library</ContextMenu.Item>
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger>Add to Playlist</ContextMenu.SubTrigger>
				<ContextMenu.SubContent class="w-48">
					<ContextMenu.Item>
						<CirclePlus class="mr-2 size-4" /> New Playlist
					</ContextMenu.Item>
					<ContextMenu.Separator />
					{#each playlists as playlist}
						<ContextMenu.Item>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								class="mr-2 size-4"
								viewBox="0 0 24 24"
							>
								<path
									d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3"
								/>
							</svg>
							{playlist}
						</ContextMenu.Item>
					{/each}
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
			<ContextMenu.Separator />
			<ContextMenu.Item>Play Next</ContextMenu.Item>
			<ContextMenu.Item>Play Later</ContextMenu.Item>
			<ContextMenu.Item>Create Station</ContextMenu.Item>
			<ContextMenu.Separator />
			<ContextMenu.Item>Like</ContextMenu.Item>
			<ContextMenu.Item>Share</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
	<div class="space-y-1 text-sm">
		<h3 class="font-medium leading-none">{album.name}</h3>
		<p class="text-muted-foreground text-xs">{album.artist}</p>
	</div>
</div>
