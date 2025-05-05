<script lang="ts">
	import AudioWaveFormIcon from "@lucide/svelte/icons/audio-waveform";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import CommandIcon from "@lucide/svelte/icons/command";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import SearchIcon from "@lucide/svelte/icons/search";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SquareTerminalIcon from "@lucide/svelte/icons/square";

	import NavUser from "$lib/registry/blocks/sidebar-07/components/nav-user.svelte";
	import TeamSwitcher from "$lib/registry/blocks/sidebar-07/components/team-switcher.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";

	import { UI } from "../../__registry__/ui.js";
	import type { ComponentProps } from "svelte";
	import { getComponentName } from "$lib/utils.js";

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		teams: [
			{
				name: "Acme Inc",
				logo: GalleryVerticalEndIcon,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveFormIcon,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: CommandIcon,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminalIcon,
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
				icon: BotIcon,
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
				icon: BookOpenIcon,
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
				icon: Settings2Icon,
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
		components: Object.values(UI)
			.filter((item) => item.type === "registry:ui")
			.concat([
				{
					name: "combobox",
					type: "registry:ui",
				},
			])
			.sort((a, b) => a.name.localeCompare(b.name)),
	};
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
		<Sidebar.Group class="py-0 group-data-[collapsible=icon]:hidden">
			<Sidebar.GroupContent>
				<form class="relative">
					<Label for="search" class="sr-only">Search</Label>
					<Sidebar.Input id="search" placeholder="Search the docs..." class="pl-8" />
					<SearchIcon
						class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
					/>
				</form>
			</Sidebar.GroupContent>
		</Sidebar.Group>
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
										<Sidebar.MenuButton {...props}>
											{#snippet tooltipContent()}
												{item.title}
											{/snippet}
											{#if item.icon}
												<item.icon />
											{/if}
											<span>{item.title}</span>
											<ChevronRightIcon
												class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
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
		<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
			<Sidebar.GroupLabel>Components</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each data.components as item (item.name)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href={`/#${item.name}`} {...props}>
									<span>{getComponentName(item.name)}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
