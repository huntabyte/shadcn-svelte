<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		teams: [
			{
				name: "Acme Inc",
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				lucide: "TerminalSquareIcon",
				tabler: "IconTerminal2",
				hugeicons: "ComputerTerminalIcon",
				phosphor: "TerminalIcon",
				isActive: true,
				items: [
					{
						title: "History",
						url: "#",
					},
					{
						title: "Starred",
						url: "#",
					},
					{
						title: "Settings",
						url: "#",
					},
				],
			},
			{
				title: "Models",
				url: "#",
				lucide: "BotIcon",
				tabler: "IconRobot",
				hugeicons: "RoboticIcon",
				phosphor: "RobotIcon",
				items: [
					{
						title: "Genesis",
						url: "#",
					},
					{
						title: "Explorer",
						url: "#",
					},
					{
						title: "Quantum",
						url: "#",
					},
				],
			},
			{
				title: "Documentation",
				url: "#",
				lucide: "BookOpen",
				tabler: "IconBook",
				hugeicons: "BookOpen02Icon",
				phosphor: "BookOpenIcon",
				items: [
					{
						title: "Introduction",
						url: "#",
					},
					{
						title: "Get Started",
						url: "#",
					},
					{
						title: "Tutorials",
						url: "#",
					},
					{
						title: "Changelog",
						url: "#",
					},
				],
			},
			{
				title: "Settings",
				url: "#",
				lucide: "Settings2Icon",
				tabler: "IconSettings",
				hugeicons: "Settings05Icon",
				phosphor: "GearIcon",
				items: [
					{
						title: "General",
						url: "#",
					},
					{
						title: "Team",
						url: "#",
					},
					{
						title: "Billing",
						url: "#",
					},
					{
						title: "Limits",
						url: "#",
					},
				],
			},
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				lucide: "FrameIcon",
				tabler: "IconFrame",
				hugeicons: "CropIcon",
				phosphor: "CropIcon",
			},
			{
				name: "Sales & Marketing",
				url: "#",
				lucide: "PieChartIcon",
				tabler: "IconChartPie",
				hugeicons: "PieChartIcon",
				phosphor: "ChartPieIcon",
			},
			{
				name: "Travel",
				url: "#",
				lucide: "MapIcon",
				tabler: "IconMap",
				hugeicons: "MapsIcon",
				phosphor: "MapTrifoldIcon",
			},
		],
	};

	let activeTeam = $state(data.teams[0]);
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon" class="absolute">
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
									<span class="flex size-8 items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 256 256"
										>
											<rect width="256" height="256" fill="none"></rect>
											<line
												x1="208"
												y1="128"
												x2="128"
												y2="208"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="32"
											></line>
											<line
												x1="192"
												y1="40"
												x2="40"
												y2="192"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="32"
											></line>
										</svg>
									</span>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-medium">{activeTeam.name}</span>
										<span class="truncate text-xs">{activeTeam.plan}</span>
									</div>
									<IconPlaceholder
										lucide="ChevronsUpDownIcon"
										tabler="IconSelector"
										hugeicons="UnfoldMoreIcon"
										phosphor="CaretUpDownIcon"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Teams</DropdownMenu.Label>
							</DropdownMenu.Group>
							<DropdownMenu.Group>
								{#each data.teams as team (team.name)}
									<DropdownMenu.Item onclick={() => (activeTeam = team)}>
										{team.name}
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each data.navMain as item (item.title)}
						<Collapsible.Root open={item.isActive} class="group/collapsible">
							{#snippet child({ props })}
								<Sidebar.MenuItem {...props}>
									<Collapsible.Trigger>
										{#snippet child({ props })}
											<Sidebar.MenuButton
												tooltipContent={item.title}
												{...props}
											>
												<IconPlaceholder
													lucide={item.lucide as any}
													tabler={item.tabler as any}
													hugeicons={item.hugeicons as any}
													phosphor={item.phosphor as any}
												/>
												<span>{item.title}</span>
												<IconPlaceholder
													lucide="ChevronRightIcon"
													tabler="IconChevronRight"
													hugeicons="ArrowRight01Icon"
													phosphor="CaretRightIcon"
													class="ml-auto transition-transform duration-100 group-data-[state=open]/collapsible:rotate-90"
												/>
											</Sidebar.MenuButton>
										{/snippet}
									</Collapsible.Trigger>
									<Collapsible.Content>
										<Sidebar.MenuSub>
											{#each item.items ?? [] as subItem (subItem.title)}
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														{#snippet child({ props })}
															<a href={subItem.url} {...props}
																>{subItem.title}</a
															>
														{/snippet}
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
											{/each}
										</Sidebar.MenuSub>
									</Collapsible.Content>
								</Sidebar.MenuItem>
							{/snippet}
						</Collapsible.Root>
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
			<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
				<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each data.projects as item (item.name)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<IconPlaceholder
											lucide={item.lucide as any}
											tabler={item.tabler as any}
											hugeicons={item.hugeicons as any}
											phosphor={item.phosphor as any}
										/>
										{item.name}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer>
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
									<Avatar.Root>
										<Avatar.Image src={data.user.avatar} alt={data.user.name} />
										<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
									</Avatar.Root>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-medium">{data.user.name}</span>
										<span class="truncate text-xs">{data.user.email}</span>
									</div>
									<IconPlaceholder
										lucide="ChevronsUpDownIcon"
										tabler="IconSelector"
										hugeicons="UnfoldMoreIcon"
										phosphor="CaretUpDownIcon"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>
									<Item.Root size="xs">
										<Item.Media>
											<Avatar.Root>
												<Avatar.Image
													src={data.user.avatar}
													alt={data.user.name}
												/>
												<Avatar.Fallback>CN</Avatar.Fallback>
											</Avatar.Root>
										</Item.Media>
										<Item.Content>
											<Item.Title>{data.user.name}</Item.Title>
											<Item.Description>{data.user.email}</Item.Description>
										</Item.Content>
									</Item.Root>
								</DropdownMenu.Label>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item>Account</DropdownMenu.Item>
								<DropdownMenu.Item>Billing</DropdownMenu.Item>
								<DropdownMenu.Item>Settings</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item>Log out</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Footer>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted/50 min-h-(--preview-height) flex-1 rounded-xl md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
