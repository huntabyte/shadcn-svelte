<script lang="ts">
	import { page } from "$app/state";
	import SidebarIcon from "@lucide/svelte/icons/sidebar";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import SearchForm from "./search-form.svelte";
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { useSidebar } from "$lib/registry/ui/sidebar/index.js";
	import ModeToggle from "./mode-toggle.svelte";
	import NavUser from "./nav-user.svelte";

	const sidebar = useSidebar();

	// Faux breadcrumbs for demo.
	const breadcrumbs = $derived.by(() => {
		return page.url.pathname
			.split("/")
			.filter((path) => path !== "")
			.map((path, index, array) => ({
				label: path,
				href: `/${array.slice(0, index + 1).join("/")}`,
			}));
	});
</script>

<header
	data-slot="site-header"
	class="bg-background sticky top-0 z-50 flex w-full items-center border-b"
>
	<div class="h-(--header-height) flex w-full items-center gap-2 px-2 pr-4">
		<Button variant="ghost" size="sm" onclick={sidebar.toggle} class="gap-2.5 has-[>svg]:px-2">
			<SidebarIcon />
			<span class="truncate font-medium">Acme Inc</span>
		</Button>
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<Breadcrumb.Root class="hidden sm:block">
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/" class="capitalize">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				{#each breadcrumbs as breadcrumb (breadcrumb.href)}
					{#if breadcrumb.href === page.url.pathname}
						<Breadcrumb.Item>
							<Breadcrumb.Page class="capitalize">
								{breadcrumb.label}
							</Breadcrumb.Page>
						</Breadcrumb.Item>
					{:else}
						<Breadcrumb.Item>
							<Breadcrumb.Link href={breadcrumb.href} class="capitalize">
								{breadcrumb.label}
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					{/if}
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<div class="ml-auto flex items-center gap-2">
			<SearchForm class="w-full sm:w-auto" />
			<ThemeSelector />
			<ModeToggle />
			<NavUser
				user={{
					name: "shadcn",
					email: "m@example.com",
					avatar: "/avatars/shadcn.jpg",
				}}
			/>
		</div>
	</div>
</header>
