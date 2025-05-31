import { components, installation, registry } from "$content/index.js";
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

	for (const doc of components) {
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
	const registryNavItems: SidebarNavItem[] = [];

	for (const doc of registry) {
		registryNavItems.push({
			title: doc.title,
			href: `/docs/registry/${doc.slug}`,
			items: [],
		});
	}

	return registryNavItems;
}

export const sidebarNavItems: SidebarNavItem[] = [
	{
		title: "Getting Started",
		items: generateGettingStartedNav(),
	},
	{
		title: "Components",
		items: generateComponentsNav(),
	},
	{
		title: "Installation",
		items: generateInstallationNav(),
	},
	{
		title: "Dark Mode",
		items: generateDarkModeNav(),
	},
	{
		title: "Registry",
		items: generateRegistryNav(),
	},
];
