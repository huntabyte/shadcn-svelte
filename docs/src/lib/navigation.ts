import { components, installation, migration } from "$content/index.js";
import type { Component } from "svelte";

/** List new components here to highlight them in the sidebar */
export const NEW_COMPONENTS = new Set([
	"item",
	"button-group",
	"kbd",
	"spinner",
	"input-group",
	"field",
	"empty",
	"native-select",
]);

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	icon?: Component;
	indicator?: "new";
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

function generateSectionsNav(): SidebarNavItem[] {
	const sectionsNavItems: SidebarNavItem[] = [
		{
			title: "Get Started",
			href: "/docs",
			items: [],
		},
		{
			title: "Components",
			href: "/docs/components",
			items: [],
		} /*
		{
			title: "Directory",
			href: "/docs/directory",
			items: [],
		},
		{
			title: "MCP Server",
			href: "/docs/mcp",
			items: [],
		},
		{
			title: "Forms",
			href: "/docs/forms",
			items: [],
			},*/,
		{
			title: "Changelog",
			href: "/docs/changelog",
			items: [],
		},
	];

	return sectionsNavItems;
}

function generateGetStartedNav(): SidebarNavItem[] {
	const getStartedNavItems: SidebarNavItem[] = [
		{
			title: "Installation",
			href: "/docs/installation",
			items: [],
		},
		{
			title: "components.json",
			href: "/docs/components-json",
			items: [],
		},
		{
			title: "Theming",
			href: "/docs/theming",
			items: [],
		},
		{
			title: "Dark Mode",
			href: "/docs/dark-mode",
			items: [],
		},
		{
			title: "CLI",
			href: "/docs/cli",
			items: [],
		},
		{
			title: "JavaScript",
			href: "/docs/javascript",
			items: [],
		},
		// {
		// 	title: "Blocks",
		// 	href: "/docs/blocks",
		// 	items: [],
		// },
		{
			title: "Figma",
			href: "/docs/figma",
			items: [],
		},
		{
			title: "llms.txt",
			href: "/llms.txt",
			items: [],
		},
		{
			title: "Legacy Docs",
			href: "/docs/legacy",
			items: [],
		},
	];

	return getStartedNavItems;
}

const INSTALL_ORDER = ["SvelteKit", "Vite", "Astro", "Manual Installation"];

function generateInstallationNav(): SidebarNavItem[] {
	const installationNavItems: SidebarNavItem[] = [];

	const index = installation.find((doc) => doc.title === "Installation");
	if (index) {
		installationNavItems.push({
			title: index.title,
			href: `/docs/installation`,
			items: [],
		});
	}

	for (const doc of installation) {
		installationNavItems.push({
			title: doc.title,
			href: `/docs/installation/${doc.slug}`,
			items: [],
		});
	}

	return installationNavItems.sort((a, b) => {
		const aIndex = INSTALL_ORDER.indexOf(a.title);
		const bIndex = INSTALL_ORDER.indexOf(b.title);
		return aIndex - bIndex;
	});
}

function generateComponentsNav(): SidebarNavItem[] {
	const componentsNavItems: SidebarNavItem[] = [];
	const index = components.find((doc) => doc.title === "Components");
	if (index) {
		componentsNavItems.push({
			title: index.title,
			href: `/docs/components`,
			items: [],
		});
	}

	for (const doc of components) {
		if (doc.title === "Components") continue;
		componentsNavItems.push({
			title: doc.title,
			indicator: NEW_COMPONENTS.has(doc.slug) ? "new" : undefined,
			href: `/docs/components/${doc.slug}`,
			items: [],
		});
	}

	return componentsNavItems;
}

function generateDarkModeNav(): SidebarNavItem[] {
	const darkModeNavItems: SidebarNavItem[] = [
		{
			title: "Svelte",
			href: "/docs/dark-mode/svelte",
			items: [],
		},
		{
			title: "Astro",
			href: "/docs/dark-mode/astro",
			items: [],
		},
	];

	return darkModeNavItems;
}

function generateRegistryNav(): SidebarNavItem[] {
	const registryNavItems: SidebarNavItem[] = [
		{
			title: "Registry",
			href: "/docs/registry",
			items: [],
		},
		{
			title: "Getting Started",
			href: "/docs/registry/getting-started",
			items: [],
		},
		{
			title: "FAQ",
			href: "/docs/registry/faq",
			items: [],
		},
		{
			title: "Examples",
			href: "/docs/registry/examples",
			items: [],
		},
		{
			title: "registry.json",
			href: "/docs/registry/registry-json",
			items: [],
		},
		{
			title: "registry-item.json",
			href: "/docs/registry/registry-item-json",
			items: [],
		},
	];

	return registryNavItems;
}

function generateMigrationNav(): SidebarNavItem[] {
	const migrationNavItems: SidebarNavItem[] = [];

	const index = migration.find((doc) => doc.title === "Migration");
	if (index) {
		migrationNavItems.push({
			title: index.title,
			href: `/docs/migration`,
			items: [],
		});
	}

	for (const doc of migration) {
		if (doc.title === "Migration") continue;
		migrationNavItems.push({
			title: doc.title,
			href: `/docs/migration/${doc.slug}`,
			items: [],
		});
	}

	return migrationNavItems;
}
const sectionsNav = generateSectionsNav();
const getStartedNav = generateGetStartedNav();
const migrationNav = generateMigrationNav();
const componentsNav = generateComponentsNav();
const installationNav = generateInstallationNav();
const darkModeNav = generateDarkModeNav();
const registryNav = generateRegistryNav();

export const sidebarNavItems: SidebarNavItem[] = [
	{
		title: "Sections",
		items: sectionsNav,
	},
	{
		title: "Get Started",
		items: getStartedNav,
	},
	{
		title: "Migration",
		items: migrationNav.filter((item) => item.title !== "Migration"),
	},
	{
		title: "Components",
		items: componentsNav.filter((item) => item.title !== "Components"),
	},
	{
		title: "Installation",
		items: installationNav.filter((item) => item.title !== "Installation"),
	},
	{
		title: "Dark Mode",
		items: darkModeNav,
	},
	{
		title: "Registry",
		items: registryNav,
	},
];

export const mainNavItems: NavItem[] = [
	{
		title: "Docs",
		href: "/docs/installation",
	},
	{
		title: "Components",
		href: "/docs/components",
	},
	{
		title: "Blocks",
		href: "/blocks",
	},
	{
		title: "Charts",
		href: "/charts/area",
	},
	{
		title: "Create",
		href: "/create",
	},
];

export function getFullNavItems(): Array<SidebarNavItem & { index: number }> {
	return [
		...getStartedNav,
		...migrationNav,
		...componentsNav,
		...installationNav.filter((item) => item.title !== "Installation"),
		...darkModeNav.filter((item) => item.title !== "Dark Mode"),
		...registryNav,
	].map((item, index) => ({
		...item,
		index,
	}));
}

const fullNavItems = getFullNavItems();

export function findNeighbors(pathName: string): {
	previous: SidebarNavItem | null;
	next: SidebarNavItem | null;
} {
	const path = pathName.split("?")[0].split("#")[0];
	const index = fullNavItems.findIndex((item) => item.href === path);

	let previous: SidebarNavItem | null = null;
	for (let i = index - 1; i >= 0; i--) {
		if (fullNavItems[i].href !== "/llms.txt") {
			previous = fullNavItems[i];
			break;
		}
	}

	let next: SidebarNavItem | null = null;
	for (let i = index + 1; i < fullNavItems.length; i++) {
		if (fullNavItems[i].href !== "/llms.txt") {
			next = fullNavItems[i];
			break;
		}
	}

	return { previous, next };
}
