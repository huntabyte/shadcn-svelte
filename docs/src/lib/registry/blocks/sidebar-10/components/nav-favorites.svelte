<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { useSidebar } from "$lib/registry/ui/sidebar/index.js";
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import LinkIcon from "@lucide/svelte/icons/link";
	import StarOffIcon from "@lucide/svelte/icons/star-off";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	let {
		favorites,
	}: {
		favorites: {
			name: string;
			url: string;
			emoji: string;
		}[];
	} = $props();

	const sidebar = useSidebar();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
	<Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each favorites as item (item.name)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={item.url} title={item.name} {...props}>
							<span>{item.emoji}</span>
							<span>{item.name}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuAction showOnHover {...props}>
								<EllipsisIcon />
								<span class="sr-only">More</span>
							</Sidebar.MenuAction>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-56 rounded-lg"
						side={sidebar.isMobile ? "bottom" : "right"}
						align={sidebar.isMobile ? "end" : "start"}
					>
						<DropdownMenu.Item>
							<StarOffIcon class="text-muted-foreground" />
							<span>Remove from Favorites</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<LinkIcon class="text-muted-foreground" />
							<span>Copy Link</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<ArrowUpRightIcon class="text-muted-foreground" />
							<span>Open in New Tab</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<Trash2Icon class="text-muted-foreground" />
							<span>Delete</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		{/each}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="text-sidebar-foreground/70">
				<EllipsisIcon />
				<span>More</span>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Group>
