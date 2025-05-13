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
	import SearchForm from "$lib/registry/new-york/block/sidebar-02/components/search-form.svelte";
	import VersionSwitcher from "$lib/registry/new-york/block/sidebar-02/components/version-switcher.svelte";
	import * as Collapsible from "$lib/registry/new-york/ui/collapsible/index.js";
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
		<SearchForm />
	</Sidebar.Header>
	<Sidebar.Content class="gap-0">
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Collapsible.Root title={group.title} open={true} class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel
						class="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
					>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								{group.title}
								<ChevronRight
									class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
								/>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each group.items as item (item.title)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton isActive={item.isActive}>
											{#snippet child({ props })}
												<a href={item.url} {...props}>{item.title}</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
