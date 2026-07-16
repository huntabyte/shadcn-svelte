<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import { onMount, tick } from "svelte";
	import { PAGES_NEW, type SidebarNavItem } from "$lib/navigation.js";
	import type { ComponentProps } from "svelte";

	let {
		navItems,
		...restProps
	}: { navItems: SidebarNavItem[] } & ComponentProps<typeof Sidebar.Root> = $props();

	let content = $state<HTMLElement | null>(null);
	const SCROLL_STORAGE_KEY = "docs-sidebar-scroll";

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

	function readScrollState(): { pathname: string; scrollTop: number } | null {
		try {
			return JSON.parse(sessionStorage.getItem(SCROLL_STORAGE_KEY) ?? "");
		} catch {
			return null;
		}
	}

	function saveScrollState() {
		if (!content) return;
		try {
			sessionStorage.setItem(
				SCROLL_STORAGE_KEY,
				JSON.stringify({ pathname, scrollTop: content.scrollTop })
			);
		} catch {
			// Storage may be unavailable in private browsing or embedded contexts.
		}
	}

	function getActiveItem(): HTMLElement | null {
		if (!content) return null;
		const items = content.querySelectorAll<HTMLElement>('[data-active="true"]');
		const containerRect = content.getBoundingClientRect();
		const containerCenter = containerRect.top + content.clientHeight / 2;
		let active: HTMLElement | null = null;
		let activePathLength = -1;
		let activeDistance = Infinity;

		for (const item of items) {
			const link = item.querySelector<HTMLAnchorElement>("a[href]");
			const href = item.getAttribute("href") ?? link?.getAttribute("href");
			const pathLength = href?.length ?? 0;
			const rect = item.getBoundingClientRect();
			const distance = Math.abs(rect.top + rect.height / 2 - containerCenter);
			if (
				pathLength > activePathLength ||
				(pathLength === activePathLength && distance < activeDistance)
			) {
				active = item;
				activePathLength = pathLength;
				activeDistance = distance;
			}
		}

		return active;
	}

	async function restoreScroll() {
		await tick();
		if (!content || !content.clientHeight) return;

		const stored = readScrollState();
		if (stored?.pathname === pathname) {
			content.scrollTop = stored.scrollTop;
			saveScrollState();
			return;
		}

		const active = getActiveItem();
		if (!active) return;
		const containerRect = content.getBoundingClientRect();
		const activeRect = active.getBoundingClientRect();
		if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
			content.scrollTop +=
				activeRect.top - containerRect.top - (content.clientHeight - activeRect.height) / 2;
		}
		saveScrollState();
	}

	$effect(() => {
		pathname;
		void restoreScroll();
	});

	afterNavigate(() => void restoreScroll());

	onMount(() => {
		const observer = new MutationObserver(() => void restoreScroll());
		if (content) observer.observe(content, { childList: true, subtree: true });
		content?.addEventListener("scroll", saveScrollState, { passive: true });
		return () => {
			observer.disconnect();
			content?.removeEventListener("scroll", saveScrollState);
		};
	});
</script>

<Sidebar.Root
	class="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
	collapsible="none"
	{...restProps}
	><div class="h-9"></div>
	<div
		class="from-background via-background/80 to-background/50 absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b blur-xs"
	></div>

	<div
		class="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)] lg:flex"
	></div>
	<Sidebar.Content
		bind:ref={content}
		data-docs-sidebar-content
		class="no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2.5"
	>
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
												class="bg-svelte-orange flex size-2 rounded-full"
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
											isActive={normalizePath(subItem.href) ===
												normalizePath(pathname)}
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
															class="bg-svelte-orange flex size-2 rounded-full"
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
