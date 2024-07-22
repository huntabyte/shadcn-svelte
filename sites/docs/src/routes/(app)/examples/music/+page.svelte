<script lang="ts">
	import PlusCircled from "svelte-radix/PlusCircled.svelte";
	import { AlbumArtwork, Menu, PodcastEmptyPlaceholder, Sidebar } from "./(components)/index.js";
	import { playlists } from "./(data)/playlists.js";
	import { listenNowAlbums, madeForYouAlbums } from "./(data)/albums.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import { ScrollArea } from "$lib/registry/new-york/ui/scroll-area/index.js";
	import MusicLight from "$lib/img/examples/music-light.png?enhanced";
	import MusicDark from "$lib/img/examples/music-dark.png?enhanced";
</script>

<div class="md:hidden">
	<enhanced:img src={MusicLight} alt="Music" class="block dark:hidden" />
	<enhanced:img src={MusicDark} alt="Music" class="hidden dark:block" />
</div>
<div class="hidden md:block">
	<Menu />
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-5">
				<Sidebar {playlists} class="hidden lg:block" />
				<div class="col-span-3 lg:col-span-4 lg:border-l">
					<div class="h-full px-4 py-6 lg:px-8">
						<Tabs.Root value="music" class="h-full space-y-6">
							<div class="space-between flex items-center">
								<Tabs.List>
									<Tabs.Trigger value="music" class="relative">
										Music
									</Tabs.Trigger>
									<Tabs.Trigger value="podcasts">Podcasts</Tabs.Trigger>
									<Tabs.Trigger value="live" disabled>Live</Tabs.Trigger>
								</Tabs.List>
								<div class="ml-auto mr-4">
									<Button>
										<PlusCircled class="mr-2 h-4 w-4" />
										Add music
									</Button>
								</div>
							</div>
							<Tabs.Content value="music" class="border-none p-0 outline-none">
								<div class="flex items-center justify-between">
									<div class="space-y-1">
										<h2 class="text-2xl font-semibold tracking-tight">
											Listen Now
										</h2>
										<p class="text-muted-foreground text-sm">
											Top picks for you. Updated daily.
										</p>
									</div>
								</div>
								<Separator class="my-4" />
								<div class="relative">
									<ScrollArea orientation="both">
										<div class="flex space-x-4 pb-4">
											{#each listenNowAlbums as album}
												<AlbumArtwork
													{album}
													class="w-[250px]"
													aspectRatio="portrait"
													width={250}
													height={330}
												/>
											{/each}
										</div>
									</ScrollArea>
								</div>
								<div class="mt-6 space-y-1">
									<h2 class="text-2xl font-semibold tracking-tight">
										Made for You
									</h2>
									<p class="text-muted-foreground text-sm">
										Your personal playlists. Updated daily.
									</p>
								</div>
								<Separator class="my-4" />
								<div class="relative">
									<ScrollArea orientation="both">
										<div class="flex space-x-4 pb-4">
											{#each madeForYouAlbums as album}
												<AlbumArtwork
													{album}
													class="w-[150px]"
													aspectRatio="square"
													width={150}
													height={150}
												/>
											{/each}
										</div>
									</ScrollArea>
								</div>
							</Tabs.Content>
							<Tabs.Content
								value="podcasts"
								class="h-full flex-col border-none p-0 data-[state=active]:flex"
							>
								<div class="flex items-center justify-between">
									<div class="space-y-1">
										<h2 class="text-2xl font-semibold tracking-tight">
											New Episodes
										</h2>
										<p class="text-muted-foreground text-sm">
											Your favorite podcasts. Updated daily.
										</p>
									</div>
								</div>
								<Separator class="my-4" />
								<PodcastEmptyPlaceholder />
							</Tabs.Content>
						</Tabs.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
