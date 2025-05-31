import { components, installation, migration } from "$content/index.js";
import type { Component } from "svelte";

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	icon?: Component;
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

function generateGettingStartedNav() {
	const gettingStartedNavItems: SidebarNavItem[] = [
		{
			title: "Introduction",
			href: "/docs",
			items: [],
		},
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
			title: "Changelog",
			href: "/docs/changelog",
			items: [],
		},
		{
			title: "Legacy Docs",
			href: "/docs/legacy",
			items: [],
		},
	];

	return gettingStartedNavItems;
}

function generateInstallationNav() {
	const installationNavItems: SidebarNavItem[] = [];

	for (const doc of installation) {
		installationNavItems.push({
			title: doc.title,
			href: `/docs/installation/${doc.slug}`,
			items: [],
		});
	}

	return installationNavItems;
}

function generateComponentsNav() {
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
			href: `/docs/components/${doc.slug}`,
			items: [],
		});
	}

	return componentsNavItems;
}

function generateDarkModeNav() {
	const darkModeNavItems: SidebarNavItem[] = [
		{
			title: "Dark Mode",
			href: "/docs/dark-mode",
			items: [],
		},
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

function generateRegistryNav() {
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

function generateMigrationNav() {
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

const gettingStartedNav = generateGettingStartedNav();
const migrationNav = generateMigrationNav();
const componentsNav = generateComponentsNav();
const installationNav = generateInstallationNav();
const darkModeNav = generateDarkModeNav();
const registryNav = generateRegistryNav();

export const sidebarNavItems: SidebarNavItem[] = [
	{
		title: "Getting Started",
		items: gettingStartedNav,
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
		items: installationNav,
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
		href: "/docs",
	},
	{
		title: "Components",
		href: "/docs/components",
	},
	{
		title: "Blocks",
		href: "/docs/blocks",
	},
	{
		title: "Charts",
		href: "/docs/charts",
	},
	{
		title: "Themes",
		href: "/docs/themes",
	},
	{
		title: "Colors",
		href: "/docs/colors",
	},
];

export function getFullNavItems(): Array<SidebarNavItem & { index: number }> {
	return [
		...gettingStartedNav,
		...migrationNav,
		...componentsNav,
		...installationNav,
		...darkModeNav,
		...registryNav,
	].map((item, index) => ({
		...item,
		index,
	}));
}

const fullNavItems = getFullNavItems();

export function findNeighbors(pathName: string) {
	const path = pathName.split("?")[0].split("#")[0];
	const index = fullNavItems.findIndex((item) => item.href === path);
	const previous = fullNavItems[index - 1] ?? null;
	const next = fullNavItems[index + 1] ?? null;
	return { previous, next };
}
