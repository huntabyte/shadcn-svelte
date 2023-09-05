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
			title: "Themes",
			href: "/themes"
		},
		{
			title: "Examples",
			href: "/examples/dashboard"
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
					title: "components.json",
					href: "/docs/components-json",
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
					href: "/docs/typography",
					items: []
				},
				{
					title: "Figma",
					href: "/docs/figma",
					items: []
				},
				{
					title: "Changelog",
					href: "/docs/changelog",
					items: []
				},
				{
					title: "About",
					href: "/docs/about",
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
				{
					title: "Combobox",
					disabled: true,
					label: "Soon",
					href: "#",
					items: []
				},
				// {
				//   title: "Command",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Context Menu",
					href: "/docs/components/context-menu",
					items: []
				},
				{
					title: "Data Table",
					href: "/docs/components/data-table",
					items: []
				},
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
				{
					title: "Dropdown Menu",
					href: "/docs/components/dropdown-menu",
					items: []
				},
				{
					title: "Form",
					href: "/docs/components/form",
					label: "Preview",
					items: []
				},
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
				{
					title: "Menubar",
					href: "/docs/components/menubar",
					items: []
				},
				// {
				//   title: "Navigation Menu",
				//   href: "#",
				//   label: "Soon",
				//   disabled: true,
				//   items: []
				// },
				{
					title: "Popover",
					href: "/docs/components/popover",
					items: []
				},
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
				{
					title: "Select",
					href: "/docs/components/select",
					items: []
				},
				{
					title: "Separator",
					href: "/docs/components/separator",
					items: []
				},
				{
					title: "Sheet",
					href: "/docs/components/sheet",
					items: []
				},
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
				},
				{
					title: "Tooltip",
					href: "/docs/components/tooltip",
					items: []
				}
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
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/docs/dashboard"
	},
	{
		name: "Cards",
		href: "/examples/cards",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/cards"
	},
	// {
	// 	name: "Tasks",
	// 	href: "/examples/tasks",
	// 	label: "New",
	// 	code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/apps/www/app/examples/tasks"
	// },
	{
		name: "Playground",
		href: "/examples/playground",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/playground"
	},
	{
		name: "Music",
		href: "/examples/music",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/music"
	},
	{
		name: "Authentication",
		href: "/examples/authentication",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/authentication"
	},
	{
		name: "Forms",
		href: "/examples/forms",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/forms"
	}
];
