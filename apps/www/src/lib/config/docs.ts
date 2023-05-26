import type { NavItem, SidebarNavItem } from "$lib/types/nav";

interface DocsConfig {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs"
		},
		{
			title: "Components",
			href: "/docs/components/accordion"
		},
		{
			title: "Examples",
			href: "/examples/dashboard"
		},
		{
			title: "Figma",
			href: "/docs/figma"
		},
		{
			title: "GitHub",
			href: "https://github.com/huntabyte/shadcn-svelte",
			external: true
		}
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: []
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: []
				},
				{
					title: "Theming",
					href: "/docs/theming",
					items: []
				},
				{
					title: "CLI",
					href: "/docs/cli",
					items: []
				},
				{
					title: "Typography",
					href: "/docs/components/typography",
					items: []
				}
			]
		},
		{
			title: "Community",
			items: [
				{
					title: "Figma",
					href: "/docs/figma",
					items: []
				}
			]
		},
		{
			title: "Forms",
			items: [
				{
					title: "Superforms",
					href: "#",
					label: "Soon",
					disabled: true,
					items: []
				}
			]
		},
		{
			title: "Components",
			items: [
				{
					title: "Accordion",
					href: "/docs/components/accordion",
					items: []
				},
				{
					title: "Alert",
					href: "/docs/components/alert",
					items: []
				},
				{
					title: "Alert Dialog",
					href: "/docs/components/alert-dialog",
					items: []
				},
				{
					title: "Aspect Ratio",
					href: "/docs/components/aspect-ratio",
					items: []
				},
				{
					title: "Avatar",
					href: "/docs/components/avatar",
					items: []
				},
				{
					title: "Badge",
					href: "/docs/components/badge",
					items: []
				},
				{
					title: "Button",
					href: "/docs/components/button",
					items: []
				},
				// {
				//   title: "Calendar",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Card",
					href: "/docs/components/card",
					items: []
				},
				{
					title: "Checkbox",
					href: "/docs/components/checkbox",
					items: []
				},
				{
					title: "Collapsible",
					href: "/docs/components/collapsible",
					items: []
				},
				// {
				//   title: "Combobox",
				//   href: "#",
				//   label: "Soon",
				//   items: [],
				//   disabled: true
				// },
				// {
				//   title: "Command",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Context Menu",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Data Table",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Date Picker",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Dialog",
					href: "/docs/components/dialog",
					items: []
				},
				// {
				//   title: "Dropdown Menu",
				//   href: "#",
				//   items: []
				// },
				{
					title: "Hover Card",
					href: "/docs/components/hover-card",
					items: []
				},
				{
					title: "Input",
					href: "/docs/components/input",
					items: []
				},
				{
					title: "Label",
					href: "/docs/components/label",
					items: []
				},
				// {
				//   title: "Menubar",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Navigation Menu",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Popover",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Progress",
					href: "/docs/components/progress",
					items: []
				},
				{
					title: "Radio Group",
					href: "/docs/components/radio-group",
					items: []
				},
				// {
				//   title: "Scroll Area",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				// {
				//   title: "Select",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Separator",
					href: "/docs/components/separator",
					items: []
				},
				// {
				//   title: "Sheet",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Skeleton",
					href: "/docs/components/skeleton",
					items: []
				},
				{
					title: "Slider",
					href: "/docs/components/slider",
					items: []
				},
				{
					title: "Switch",
					href: "/docs/components/switch",
					items: []
				},
				{
					title: "Table",
					href: "/docs/components/table",
					items: []
				},
				{
					title: "Tabs",
					href: "/docs/components/tabs",
					items: []
				},
				{
					title: "Textarea",
					href: "/docs/components/textarea",
					items: []
				},
				// {
				//   title: "Toast",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Toggle",
					href: "/docs/components/toggle",
					items: []
				}
				// {
				//   title: "Tooltip",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// }
			]
		}
	]
};

type Example = {
	name: string;
	href: string;
	label?: string;
	code: string;
};
export const examples: Example[] = [
	{
		name: "Dashboard",
		href: "/examples/dashboard",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/dashboard"
	},
	{
		name: "Cards",
		href: "/examples/cards",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/cards"
	},
	// {
	// 	name: "Tasks",
	// 	href: "/examples/tasks",
	// 	label: "New",
	// 	code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/tasks"
	// },
	// {
	// 	name: "Playground",
	// 	href: "/examples/playground",
	// 	code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/playground"
	// },
	// {
	// 	name: "Music",
	// 	href: "/examples/music",
	// 	code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/music"
	// },
	{
		name: "Authentication",
		href: "/examples/authentication",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/authentication"
	},
	{
		name: "Forms",
		href: "#",
		label: "Soon",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/app/examples/forms"
	}
];
