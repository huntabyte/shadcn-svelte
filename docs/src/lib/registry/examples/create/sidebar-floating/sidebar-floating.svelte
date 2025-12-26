<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const data = {
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
</script>

<Sidebar.Provider class="bg-background">
	<Sidebar.Root variant="floating" class="absolute">
		<Sidebar.Header>
			<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton size="lg">
							{#snippet child({ props })}
								<a href="/" {...props}>
								<Item.Root class="p-0" size="xs">
									<Item.Content>
										<Item.Title class="text-sm">Documentation</Item.Title>
										<Item.Description>v1.0.0</Item.Description>
									</Item.Content>
								</Item.Root>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.Menu>
					{#each data.navMain as item (item.title)}
						<DropdownMenu.Root>
							<Sidebar.MenuItem>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton
											class="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
											{...props}
										>
											{item.title}
											<IconPlaceholder
												lucide="MoreHorizontalIcon"
												tabler="IconDots"
												hugeicons="MoreHorizontalCircle01Icon"
												phosphor="DotsThreeOutlineIcon"
												class="ml-auto"
											/>
										</Sidebar.MenuButton>
									{/snippet}
								</DropdownMenu.Trigger>
								{#if item.items?.length}
									<DropdownMenu.Content side="right" align="start">
										<DropdownMenu.Group>
											{#each item.items as subItem (subItem.title)}
												<DropdownMenu.Item>
													{#snippet child({ props })}
														<a href={subItem.url} {...props}
															>{subItem.title}</a
														>
													{/snippet}
												</DropdownMenu.Item>
											{/each}
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								{/if}
							</Sidebar.MenuItem>
						</DropdownMenu.Root>
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer>
			<Sidebar.Group>
				<Card.Root size="sm" class="-mx-2">
					<Card.Header>
						<Card.Title class="text-sm">Subscribe to our newsletter</Card.Title>
						<Card.Description>
							Opt-in to receive updates and news about the sidebar.
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<form>
							<Field.Field>
								<Sidebar.Input type="email" placeholder="Email" />
								<Button
									class="bg-sidebar-primary text-sidebar-primary-foreground w-full"
									size="sm"
								>
									Subscribe
								</Button>
							</Field.Field>
						</form>
					</Card.Content>
				</Card.Root>
			</Sidebar.Group>
		</Sidebar.Footer>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted/50 min-h-(--preview-height) flex-1 rounded-xl md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
