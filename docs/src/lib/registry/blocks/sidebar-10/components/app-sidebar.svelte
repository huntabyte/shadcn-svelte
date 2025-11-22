<script lang="ts" module>
	import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
	import BlocksIcon from "@lucide/svelte/icons/blocks";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import CommandIcon from "@lucide/svelte/icons/command";
	import HouseIcon from "@lucide/svelte/icons/house";
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import MessageCircleQuestionIcon from "@lucide/svelte/icons/message-circle-question";
	import SearchIcon from "@lucide/svelte/icons/search";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	// This is sample data.
	const data = {
		teams: [
			{
				name: "Acme Inc",
				logo: CommandIcon,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveformIcon,
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
				title: "Search",
				url: "#",
				icon: SearchIcon,
			},
			{
				title: "Ask AI",
				url: "#",
				icon: SparklesIcon,
			},
			{
				title: "Home",
				url: "#",
				icon: HouseIcon,
				isActive: true,
			},
			{
				title: "Inbox",
				url: "#",
				icon: InboxIcon,
				badge: "10",
			},
		],
		navSecondary: [
			{
				title: "Calendar",
				url: "#",
				icon: CalendarIcon,
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2Icon,
			},
			{
				title: "Templates",
				url: "#",
				icon: BlocksIcon,
			},
			{
				title: "Trash",
				url: "#",
				icon: Trash2Icon,
			},
			{
				title: "Help",
				url: "#",
				icon: MessageCircleQuestionIcon,
			},
		],
		favorites: [
			{
				name: "Project Management & Task Tracking",
				url: "#",
				emoji: "📊",
			},
			{
				name: "Family Recipe Collection & Meal Planning",
				url: "#",
				emoji: "🍳",
			},
			{
				name: "Fitness Tracker & Workout Routines",
				url: "#",
				emoji: "💪",
			},
			{
				name: "Book Notes & Reading List",
				url: "#",
				emoji: "📚",
			},
			{
				name: "Sustainable Gardening Tips & Plant Care",
				url: "#",
				emoji: "🌱",
			},
			{
				name: "Language Learning Progress & Resources",
				url: "#",
				emoji: "🗣️",
			},
			{
				name: "Home Renovation Ideas & Budget Tracker",
				url: "#",
				emoji: "🏠",
			},
			{
				name: "Personal Finance & Investment Portfolio",
				url: "#",
				emoji: "💰",
			},
			{
				name: "Movie & TV Show Watchlist with Reviews",
				url: "#",
				emoji: "🎬",
			},
			{
				name: "Daily Habit Tracker & Goal Setting",
				url: "#",
				emoji: "✅",
			},
		],
		workspaces: [
			{
				name: "Personal Life Management",
				emoji: "🏠",
				pages: [
					{
						name: "Daily Journal & Reflection",
						url: "#",
						emoji: "📔",
					},
					{
						name: "Health & Wellness Tracker",
						url: "#",
						emoji: "🍏",
					},
					{
						name: "Personal Growth & Learning Goals",
						url: "#",
						emoji: "🌟",
					},
				],
			},
			{
				name: "Professional Development",
				emoji: "💼",
				pages: [
					{
						name: "Career Objectives & Milestones",
						url: "#",
						emoji: "🎯",
					},
					{
						name: "Skill Acquisition & Training Log",
						url: "#",
						emoji: "🧠",
					},
					{
						name: "Networking Contacts & Events",
						url: "#",
						emoji: "🤝",
					},
				],
			},
			{
				name: "Creative Projects",
				emoji: "🎨",
				pages: [
					{
						name: "Writing Ideas & Story Outlines",
						url: "#",
						emoji: "✍️",
					},
					{
						name: "Art & Design Portfolio",
						url: "#",
						emoji: "🖼️",
					},
					{
						name: "Music Composition & Practice Log",
						url: "#",
						emoji: "🎵",
					},
				],
			},
			{
				name: "Home Management",
				emoji: "🏡",
				pages: [
					{
						name: "Household Budget & Expense Tracking",
						url: "#",
						emoji: "💰",
					},
					{
						name: "Home Maintenance Schedule & Tasks",
						url: "#",
						emoji: "🔧",
					},
					{
						name: "Family Calendar & Event Planning",
						url: "#",
						emoji: "📅",
					},
				],
			},
			{
				name: "Travel & Adventure",
				emoji: "🧳",
				pages: [
					{
						name: "Trip Planning & Itineraries",
						url: "#",
						emoji: "🗺️",
					},
					{
						name: "Travel Bucket List & Inspiration",
						url: "#",
						emoji: "🌎",
					},
					{
						name: "Travel Journal & Photo Gallery",
						url: "#",
						emoji: "📸",
					},
				],
			},
		],
	};
</script>

<script lang="ts">
	import NavFavorites from "./nav-favorites.svelte";
	import NavMain from "./nav-main.svelte";
	import NavSecondary from "./nav-secondary.svelte";
	import NavWorkspaces from "./nav-workspaces.svelte";
	import TeamSwitcher from "./team-switcher.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref class="border-e-0" {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
		<NavMain items={data.navMain} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavFavorites favorites={data.favorites} />
		<NavWorkspaces workspaces={data.workspaces} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
