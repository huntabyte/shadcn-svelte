<script lang="ts" module>
	// sample data
	const data = {
		versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
		navMain: [
			{
				title: "Getting Started",
				url: "#",
				items: [
					{
						title: "Installation",
						url: "#",
					},
					{
						title: "Project Structure",
						url: "#",
					},
				],
			},
			{
				title: "Building Your Application",
				url: "#",
				items: [
					{
						title: "Routing",
						url: "#",
					},
					{
						title: "Data Fetching",
						url: "#",
						isActive: true,
					},
					{
						title: "Rendering",
						url: "#",
					},
					{
						title: "Caching",
						url: "#",
					},
					{
						title: "Styling",
						url: "#",
					},
					{
						title: "Optimizing",
						url: "#",
					},
					{
						title: "Configuring",
						url: "#",
					},
					{
						title: "Testing",
						url: "#",
					},
					{
						title: "Authentication",
						url: "#",
					},
					{
						title: "Deploying",
						url: "#",
					},
					{
						title: "Upgrading",
						url: "#",
					},
					{
						title: "Examples",
						url: "#",
					},
				],
			},
			{
				title: "API Reference",
				url: "#",
				items: [
					{
						title: "Components",
						url: "#",
					},
					{
						title: "File Conventions",
						url: "#",
					},
					{
						title: "Functions",
						url: "#",
					},
					{
						title: "next.config.js Options",
						url: "#",
					},
					{
						title: "CLI",
						url: "#",
					},
					{
						title: "Edge Runtime",
						url: "#",
					},
				],
			},
			{
				title: "Architecture",
				url: "#",
				items: [
					{
						title: "Accessibility",
						url: "#",
					},
					{
						title: "Fast Refresh",
						url: "#",
					},
					{
						title: "Svelte Compiler",
						url: "#",
					},
					{
						title: "Supported Browsers",
						url: "#",
					},
					{
						title: "Rollup",
						url: "#",
					},
				],
			},
		],
	};
</script>

<script lang="ts">
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
	import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root variant="floating" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<GalleryVerticalEnd class="size-4" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Documentation</span>
								<span class="">v1.0.0</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu class="gap-2">
				{#each data.navMain as mainItem (mainItem.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">
							{#snippet child({ props })}
								<a href={mainItem.url} {...props}>
									{mainItem.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if mainItem.items?.length}
							<Sidebar.MenuSub class="ml-0 border-l-0 px-1.5">
								{#each mainItem.items as item (item.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton isActive={item.isActive}>
											{#snippet child({ props })}
												<a href={item.url} {...props}>{item.title}</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
