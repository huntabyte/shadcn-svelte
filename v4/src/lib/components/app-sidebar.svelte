<script lang="ts">
	import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";
	import AudioWaveform from "@lucide/svelte/icons/audio-waveform";
	import Command from "@lucide/svelte/icons/command";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import Bot from "@lucide/svelte/icons/bot";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Settings2 from "@lucide/svelte/icons/settings-2";

	import NavUser from "$lib/registry/block/sidebar-07/components/nav-user.svelte";
	import TeamSwitcher from "$lib/registry/block/sidebar-07/components/team-switcher.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { Index } from "../../__registry__";

	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
		teams: [
			{
				name: "Acme Inc",
				logo: GalleryVerticalEnd,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveform,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: Command,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminal,
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
				icon: Bot,
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
				icon: BookOpen,
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
				icon: Settings2,
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
		components: Object.values(Index)
			.filter((item) => item.type === "registry:ui")
			.concat([
				{
					name: "combobox",
				},
			])
			.sort((a, b) => a.name.localeCompare(b.name)),
	};
</script>

<div class="flex h-full flex-col gap-4 overflow-y-auto p-4">
	<div class="flex items-center gap-2">
		<h1 class="text-2xl font-bold">Svelte UI</h1>
	</div>
</div>
