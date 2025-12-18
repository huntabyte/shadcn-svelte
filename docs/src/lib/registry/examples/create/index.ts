import type { RegistryItemType } from "@shadcn-svelte/registry";

type Example = {
	title: string;
	name: string;
	type: RegistryItemType;
};

export const examples: Example[] = [
	{
		title: "Accordion",
		name: "accordion",
		type: "registry:example",
	},
	{
		title: "Alert",
		name: "alert",
		type: "registry:example",
	},
	{
		title: "Alert Dialog",
		name: "alert-dialog",
		type: "registry:example",
	},
	{
		title: "Aspect Ratio",
		name: "aspect-ratio",
		type: "registry:example",
	},
	{
		title: "Avatar",
		name: "avatar",
		type: "registry:example",
	},
	{
		title: "Badge",
		name: "badge",
		type: "registry:example",
	},
	{
		title: "Breadcrumb",
		name: "breadcrumb",
		type: "registry:example",
	},
	{
		title: "Button Group",
		name: "button-group",
		type: "registry:example",
	},
];
