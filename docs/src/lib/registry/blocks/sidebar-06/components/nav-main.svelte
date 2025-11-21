<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { useSidebar } from "$lib/registry/ui/sidebar/index.js";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			icon?: typeof EllipsisIcon;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();

	const sidebar = useSidebar();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<DropdownMenu.Root>
				<Sidebar.MenuItem>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								{...props}
							>
								{item.title}
								<EllipsisIcon class="ms-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					{#if item.items?.length}
						<DropdownMenu.Content
							side={sidebar.isMobile ? "bottom" : "right"}
							align={sidebar.isMobile ? "end" : "start"}
							class="min-w-56 rounded-lg"
						>
							{#each item.items as subItem (subItem.title)}
								<DropdownMenu.Item>
									{#snippet child({ props })}
										<a href={subItem.url} {...props}>{subItem.title}</a>
									{/snippet}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					{/if}
				</Sidebar.MenuItem>
			</DropdownMenu.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
