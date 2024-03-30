import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
};

export const primaryRoutes: Route[] = [
	{
		title: "Inbox",
		label: "128",
		icon: Icons.Inbox,
		variant: "default",
	},
	{
		title: "Drafts",
		label: "9",
		icon: Icons.File,
		variant: "ghost",
	},
	{
		title: "Sent",
		label: "",
		icon: Icons.Send,
		variant: "ghost",
	},
	{
		title: "Junk",
		label: "23",
		icon: Icons.ArchiveX,
		variant: "ghost",
	},
	{
		title: "Trash",
		label: "",
		icon: Icons.Trash2,
		variant: "ghost",
	},
	{
		title: "Archive",
		label: "",
		icon: Icons.Archive,
		variant: "ghost",
	},
];

export const secondaryRoutes: Route[] = [
	{
		title: "Social",
		label: "972",
		icon: Icons.Users,
		variant: "ghost",
	},
	{
		title: "Updates",
		label: "342",
		icon: Icons.CircleAlert,
		variant: "ghost",
	},
	{
		title: "Forums",
		label: "128",
		icon: Icons.MessagesSquare,
		variant: "ghost",
	},
	{
		title: "Shopping",
		label: "8",
		icon: Icons.ShoppingCart,
		variant: "ghost",
	},
	{
		title: "Promotions",
		label: "21",
		icon: Icons.Archive,
		variant: "ghost",
	},
];
