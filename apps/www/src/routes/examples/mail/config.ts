import AlertCircle from "lucide-svelte/icons/alert-circle";
import Archive from "lucide-svelte/icons/archive";
import ArchiveX from "lucide-svelte/icons/archive-x";
import File from "lucide-svelte/icons/file";
import Inbox from "lucide-svelte/icons/inbox";
import MessagesSquare from "lucide-svelte/icons/messages-square";
import Send from "lucide-svelte/icons/send";
import ShoppingCart from "lucide-svelte/icons/shopping-cart";
import Trash2 from "lucide-svelte/icons/trash-2";
import Users from "lucide-svelte/icons/users";

import type { ComponentType } from "svelte";
import type { Icon } from "lucide-svelte";

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
		icon: Inbox,
		variant: "default",
	},
	{
		title: "Drafts",
		label: "9",
		icon: File,
		variant: "ghost",
	},
	{
		title: "Sent",
		label: "",
		icon: Send,
		variant: "ghost",
	},
	{
		title: "Junk",
		label: "23",
		icon: ArchiveX,
		variant: "ghost",
	},
	{
		title: "Trash",
		label: "",
		icon: Trash2,
		variant: "ghost",
	},
	{
		title: "Archive",
		label: "",
		icon: Archive,
		variant: "ghost",
	},
];

export const secondaryRoutes: Route[] = [
	{
		title: "Social",
		label: "972",
		icon: Users,
		variant: "ghost",
	},
	{
		title: "Updates",
		label: "342",
		icon: AlertCircle,
		variant: "ghost",
	},
	{
		title: "Forums",
		label: "128",
		icon: MessagesSquare,
		variant: "ghost",
	},
	{
		title: "Shopping",
		label: "8",
		icon: ShoppingCart,
		variant: "ghost",
	},
	{
		title: "Promotions",
		label: "21",
		icon: Archive,
		variant: "ghost",
	},
];
