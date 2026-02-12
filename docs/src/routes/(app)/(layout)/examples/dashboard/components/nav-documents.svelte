<script lang="ts">
	import DotsIcon from "@tabler/icons-svelte/icons/dots";
	import FolderIcon from "@tabler/icons-svelte/icons/folder";
	import Share3Icon from "@tabler/icons-svelte/icons/share-3";
	import TrashIcon from "@tabler/icons-svelte/icons/trash";
	import type { Icon } from "@tabler/icons-svelte";

	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";

	let { items }: { items: { name: string; url: string; icon?: Icon }[] } = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
	<Sidebar.GroupLabel>Documents</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.name)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={item.url} {...props}>
							<item.icon />
							<span>{item.name}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Sidebar.MenuAction
							showOnHover
							class="data-[state=open]:bg-accent rounded-sm"
						>
							<DotsIcon />
							<span class="sr-only">More</span>
						</Sidebar.MenuAction>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-24 rounded-lg"
						side={sidebar.isMobile ? "bottom" : "right"}
						align={sidebar.isMobile ? "end" : "start"}
					>
						<DropdownMenu.Item>
							<FolderIcon />
							<span>Open</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Share3Icon />
							<span>Share</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item variant="destructive">
							<TrashIcon />
							<span>Delete</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		{/each}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="text-sidebar-foreground/70">
				<DotsIcon class="text-sidebar-foreground/70" />
				<span>More</span>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Group>
