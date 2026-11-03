<script lang="ts">
	import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import BellIcon from "@lucide/svelte/icons/bell";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CommandIcon from "@lucide/svelte/icons/command";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import ForwardIcon from "@lucide/svelte/icons/forward";
	import FrameIcon from "@lucide/svelte/icons/frame";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import MapIcon from "@lucide/svelte/icons/map";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";

	// This is sample data.
	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		teams: [
			{ name: "Acme Inc", logo: GalleryVerticalEndIcon, plan: "Enterprise" },
			{ name: "Acme Corp.", logo: AudioWaveformIcon, plan: "Startup" },
			{ name: "Evil Corp.", logo: CommandIcon, plan: "Free" },
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminalIcon,
				isActive: true,
				items: [
					{ title: "History", url: "#" },
					{ title: "Starred", url: "#" },
					{ title: "Settings", url: "#" },
				],
			},
			{
				title: "Models",
				url: "#",
				icon: BotIcon,
				items: [
					{ title: "Genesis", url: "#" },
					{ title: "Explorer", url: "#" },
					{ title: "Quantum", url: "#" },
				],
			},
			{
				title: "Documentation",
				url: "#",
				icon: BookOpenIcon,
				items: [
					{ title: "Introduction", url: "#" },
					{ title: "Get Started", url: "#" },
					{ title: "Tutorials", url: "#" },
					{ title: "Changelog", url: "#" },
				],
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2Icon,
				items: [
					{ title: "General", url: "#" },
					{ title: "Team", url: "#" },
					{ title: "Billing", url: "#" },
					{ title: "Limits", url: "#" },
				],
			},
		],
		projects: [
			{ name: "Design Engineering", url: "#", icon: FrameIcon },
			{ name: "Sales & Marketing", url: "#", icon: ChartPieIcon },
			{ name: "Travel", url: "#", icon: MapIcon },
		],
	};

	const isMobile = new IsMobile();

	let activeTeam = $state(data.teams[0]);
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon">
		<Sidebar.Header>
			{@render teamSwitcher()}
		</Sidebar.Header>
		<Sidebar.Content>
			{@render navMain()}
			{@render navProjects()}
		</Sidebar.Content>
		<Sidebar.Footer>
			{@render navUser()}
		</Sidebar.Footer>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ms-1" />
			</div>
		</header>
	</Sidebar.Inset>
</Sidebar.Provider>

{#snippet teamSwitcher()}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<activeTeam.logo class="size-4" />
							</div>
							<div class="grid flex-1 text-start text-sm leading-tight">
								<span class="truncate font-medium">{activeTeam.name}</span>
								<span class="truncate text-xs">{activeTeam.plan}</span>
							</div>
							<ChevronsUpDownIcon class="ms-auto" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
					align="start"
					side={isMobile.current ? "bottom" : "right"}
					sideOffset={4}
				>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="text-xs text-muted-foreground">Teams</DropdownMenu.Label>
						{#each data.teams as team, index (team.name)}
							<DropdownMenu.Item onSelect={() => (activeTeam = team)} class="gap-2 p-2">
								<div class="flex size-6 items-center justify-center rounded-md border">
									<team.logo class="size-3.5 shrink-0" />
								</div>
								{team.name}
								<DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<PlusIcon class="size-4" />
							</div>
							<div class="font-medium text-muted-foreground">Add team</div>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/snippet}

{#snippet navMain()}
	<Sidebar.Group>
		<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
		<Sidebar.Menu>
			{#each data.navMain as item (item.title)}
				<Collapsible.Root open={item.isActive} class="group/collapsible">
					{#snippet child({ props })}
						<Sidebar.MenuItem {...props}>
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuButton {...props} tooltipContent={item.title}>
										<item.icon />
										<span>{item.title}</span>
										<ChevronRightIcon
											class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
										/>
									</Sidebar.MenuButton>
								{/snippet}
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each item.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
														<span>{subItem.title}</span>
													</a>
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
{/snippet}

{#snippet navProjects()}
	<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
		<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
		<Sidebar.Menu>
			{#each data.projects as item (item.name)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuAction showOnHover {...props}>
									<EllipsisIcon />
									<span class="sr-only">More</span>
								</Sidebar.MenuAction>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="w-48 rounded-lg"
							side={isMobile.current ? "bottom" : "right"}
							align={isMobile.current ? "end" : "start"}
						>
							<DropdownMenu.Item>
								<FolderIcon class="text-muted-foreground" />
								<span>View Project</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<ForwardIcon class="text-muted-foreground" />
								<span>Share Project</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<Trash2Icon class="text-muted-foreground" />
								<span>Delete Project</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			{/each}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="text-sidebar-foreground/70">
					<EllipsisIcon class="text-sidebar-foreground/70" />
					<span>More</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Group>
{/snippet}

{#snippet navUser()}
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
							<Avatar.Root class="size-8 rounded-lg">
								<Avatar.Image src={data.user.avatar} alt={data.user.name} />
								<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-start text-sm leading-tight">
								<span class="truncate font-medium">{data.user.name}</span>
								<span class="truncate text-xs">{data.user.email}</span>
							</div>
							<ChevronsUpDownIcon class="ms-auto size-4" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
					side={isMobile.current ? "bottom" : "right"}
					align="end"
					sideOffset={4}
				>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="p-0 font-normal">
							<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
								<Avatar.Root class="size-8 rounded-lg">
									<Avatar.Image src={data.user.avatar} alt={data.user.name} />
									<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
								</Avatar.Root>
								<div class="grid flex-1 text-start text-sm leading-tight">
									<span class="truncate font-medium">{data.user.name}</span>
									<span class="truncate text-xs">{data.user.email}</span>
								</div>
							</div>
						</DropdownMenu.Label>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<SparklesIcon />
							Upgrade to Pro
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<BadgeCheckIcon />
							Account
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<CreditCardIcon />
							Billing
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<BellIcon />
							Notifications
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<LogOutIcon />
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/snippet}
