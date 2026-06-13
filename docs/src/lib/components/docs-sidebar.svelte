<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { page } from "$app/state";
	import { PAGES_NEW, type SidebarNavItem } from "$lib/navigation.js";
	import type { ComponentProps } from "svelte";

	let {
		navItems,
		...restProps
	}: { navItems: SidebarNavItem[] } & ComponentProps<typeof Sidebar.Root> = $props();

	const pathname = $derived(page.url.pathname.toString());

	const TOP_LEVEL_SECTIONS = [
		{ title: "Introduction", href: "/docs", items: [] },
		{ title: "Components", href: "/docs/components", items: [] },
		{ title: "Installation", href: "/docs/installation", items: [] },
		{ title: "Theming", href: "/docs/theming", items: [] },
		{ title: "CLI", href: "/docs/cli", items: [] },
		{ title: "Skills", href: "/docs/skills", items: [] },
		{ title: "Registry", href: "/docs/registry", items: [] },
		{ title: "Forms", href: "/docs/forms", items: [] },
		{ title: "Changelog", href: "/docs/changelog", items: [] },
	] satisfies SidebarNavItem[];

	const EXCLUDED_SECTIONS = new Set([
		"Sections",
		"Installation",
		"Dark Mode",
		"Changelog",
		"Forms",
		"Migration",
	]);
	const EXCLUDED_PAGES = new Set(["/docs", "/docs/changelog"]);
	const renderedNavItems = $derived(
		navItems.filter((item) => !EXCLUDED_SECTIONS.has(item.title) && item.items.length > 0)
	);

	function normalizePath(path: string): string {
		if (path === "/") return path;
		return path.endsWith("/") ? path.slice(0, -1) : path;
	}

	function isSidebarItemActive(itemHref: string | undefined, currentPathname: string): boolean {
		if (!itemHref) return false;

		const href = normalizePath(itemHref);
		const path = normalizePath(currentPathname);
		const isIntroductionRoute = href === "/docs";

		if (isIntroductionRoute) {
			return path === href;
		}

		return path === href || path.startsWith(`${href}/`);
	}
</script>

<Sidebar.Root
	class="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:calc(var(--spacing)*56)] lg:flex"
	collapsible="none"
	{...restProps}
	><div class="h-9"></div>
	<div
		class="from-background via-background/80 to-background/50 absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b blur-xs"
	></div>
	<div
		class="via-border absolute top-12 right-2 bottom-0 hidden h-full w-px bg-gradient-to-b from-transparent to-transparent lg:flex"
	></div>

	<Sidebar.Content class="no-scrollbar mx-auto w-(--sidebar-menu-width) overflow-x-hidden px-2">
		<div
			class="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-gradient-to-b blur-xs"
		></div>
		<Sidebar.Group class="pt-6">
			<Sidebar.GroupLabel class="text-muted-foreground font-medium">
				Sections
			</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each TOP_LEVEL_SECTIONS as item (item.href)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={item.href === "/docs"
									? pathname === item.href
									: pathname.startsWith(item.href)}
								class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
							>
								{#snippet child({ props })}
									<a href={item.href} {...props}>
										<span
											class="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent"
										></span>
										{item.title}
										{#if item.href && PAGES_NEW.includes(item.href)}
											<span
												class="flex size-2 rounded-full bg-blue-500"
												title="New"
											></span>
										{/if}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		{#each renderedNavItems as item (item.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel class="text-muted-foreground font-medium">
					{item.title}
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					{#if item.items.length}
						<Sidebar.Menu class="gap-0.5">
							{#each item.items as subItem (subItem.href)}
								{#if subItem.items.length === 0 && subItem.href && !EXCLUDED_PAGES.has(subItem.href)}
									<Sidebar.MenuItem class="w-full">
										<Sidebar.MenuButton
											isActive={isSidebarItemActive(subItem.href, pathname)}
											class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
										>
											{#snippet child({ props })}
												<a href={subItem.href} {...props}>
													<span
														class="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent"
													></span>
													{subItem.title}
													{#if subItem.href && PAGES_NEW.includes(subItem.href)}
														<span
															class="flex size-2 rounded-full bg-blue-500"
															title="New"
														></span>
													{/if}
												</a>
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
		<div
			class="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs"
		></div>
	</Sidebar.Content>
</Sidebar.Root>
