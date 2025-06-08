<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { page } from "$app/state";
	import type { SidebarNavItem } from "$lib/navigation.js";
	import type { ComponentProps } from "svelte";

	let {
		navItems,
		...restProps
	}: { navItems: SidebarNavItem[] } & ComponentProps<typeof Sidebar.Root> = $props();

	const pathname = $derived(page.url.pathname);
</script>

<Sidebar.Root
	class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
	collapsible="none"
	{...restProps}
>
	<Sidebar.Content class="no-scrollbar px-2 pb-12">
		<div class="h-(--top-spacing) shrink-0"></div>
		{#each navItems as item (item.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel class="text-muted-foreground font-medium">
					{item.title}
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					{#if item.items.length}
						<Sidebar.Menu class="gap-0.5">
							{#each item.items as subItem (subItem.href)}
								{#if subItem.items.length === 0}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											isActive={subItem.href === pathname}
											class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:-inset-y-1 after:inset-x-0 after:z-0 after:rounded-md"
										>
											{#snippet child({ props })}
												<a href={subItem.href} {...props}>{subItem.title}</a
												>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/if}
							{/each}
						</Sidebar.Menu>
					{/if}
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
</Sidebar.Root>
