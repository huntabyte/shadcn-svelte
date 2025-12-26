<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

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
						title: "Next.js Compiler",
						url: "#",
					},
					{
						title: "Supported Browsers",
						url: "#",
					},
					{
						title: "Turbopack",
						url: "#",
					},
				],
			},
		],
	};

	let selectedVersion = $state(data.versions[0]);
</script>

<Sidebar.Provider>
	<Sidebar.Root class="absolute">
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton
									size="lg"
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									{...props}
								>
									<Item.Root class="p-0" size="xs">
										<Item.Content>
											<Item.Title class="text-sm">Documentation</Item.Title>
											<Item.Description>v{selectedVersion}</Item.Description>
										</Item.Content>
										<Item.Actions>
											<IconPlaceholder
												lucide="ChevronsUpDownIcon"
												tabler="IconSelector"
												hugeicons="UnfoldMoreIcon"
												phosphor="CaretUpDownIcon"
											/>
										</Item.Actions>
									</Item.Root>
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{#each data.versions as version (version)}
								<DropdownMenu.Item onSelect={() => (selectedVersion = version)}>
									v{version}
									{#if version === selectedVersion}
										<IconPlaceholder
											lucide="CheckIcon"
											tabler="IconCheck"
											hugeicons="Tick02Icon"
											phosphor="CheckIcon"
											class="ml-auto"
										/>
									{/if}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
			<form>
				<Sidebar.Group class="py-0">
					<Sidebar.GroupContent class="relative">
						<Label for="search" class="sr-only">Search</Label>
						<Sidebar.Input id="search" placeholder="Search the docs..." class="pl-8" />
						<IconPlaceholder
							lucide="SearchIcon"
							tabler="IconSearch"
							hugeicons="SearchIcon"
							phosphor="MagnifyingGlassIcon"
							class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
						/>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</form>
		</Sidebar.Header>
		<Sidebar.Content>
			{#each data.navMain as item (item.title)}
				<Sidebar.Group>
					<Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each item.items as subItem (subItem.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={subItem.isActive}>
										{#snippet child({ props })}
											<a href={subItem.url} {...props}>{subItem.title}</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/each}
		</Sidebar.Content>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl" ></div>
				<div class="bg-muted/50 aspect-video rounded-xl" ></div>
				<div class="bg-muted/50 aspect-video rounded-xl" ></div>
			</div>
			<div class="bg-muted/50 min-h-(--preview-height) flex-1 rounded-xl md:min-h-min" ></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
