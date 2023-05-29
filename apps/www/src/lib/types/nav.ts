import type { Icons } from "$components/docs/icons";

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};
