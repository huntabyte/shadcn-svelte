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
		title: "Button",
		name: "button",
		type: "registry:example",
	},
	{
		title: "Button Group",
		name: "button-group",
		type: "registry:example",
	},
	{
		title: "Calendar",
		name: "calendar",
		type: "registry:example",
	},
	{
		title: "Card",
		name: "card",
		type: "registry:example",
	},
	{
		title: "Carousel",
		name: "carousel",
		type: "registry:example",
	},
	{
		title: "Checkbox",
		name: "checkbox",
		type: "registry:example",
	},
	{
		title: "Collapsible",
		name: "collapsible",
		type: "registry:example",
	},
	{
		title: "Command",
		name: "command",
		type: "registry:example",
	},
	{
		title: "Context Menu",
		name: "context-menu",
		type: "registry:example",
	},
	{
		title: "Dialog",
		name: "dialog",
		type: "registry:example",
	},
	{
		title: "Drawer",
		name: "drawer",
		type: "registry:example",
	},
	{
		title: "Dropdown Menu",
		name: "dropdown-menu",
		type: "registry:example",
	},
	{
		title: "Hover Card",
		name: "hover-card",
		type: "registry:example",
	},
	{
		title: "Empty",
		name: "empty",
		type: "registry:example",
	},
	{
		title: "Field",
		name: "field",
		type: "registry:example",
	},
	{
		title: "Input",
		name: "input",
		type: "registry:example",
	},
	{
		title: "Input Group",
		name: "input-group",
		type: "registry:example",
	},
	{
		title: "Input OTP",
		name: "input-otp",
		type: "registry:example",
	},
	{
		title: "Item",
		name: "item",
		type: "registry:example",
	},
	{
		title: "Kbd",
		name: "kbd",
		type: "registry:example",
	},
	{
		title: "Label",
		name: "label",
		type: "registry:example",
	},
	{
		title: "Menubar",
		name: "menubar",
		type: "registry:example",
	},
	{
		title: "Select",
		name: "select",
		type: "registry:example",
	},
	{
		title: "Native Select",
		name: "native-select",
		type: "registry:example",
	},
	{
		title: "Popover",
		name: "popover",
		type: "registry:example",
	},
	{
		title: "Progress",
		name: "progress",
		type: "registry:example",
	},
	{
		title: "Radio Group",
		name: "radio-group",
		type: "registry:example",
	},
	{
		title: "Resizable",
		name: "resizable",
		type: "registry:example",
	},
	{
		title: "Scroll Area",
		name: "scroll-area",
		type: "registry:example",
	},
	{
		title: "Separator",
		name: "separator",
		type: "registry:example",
	},
	{
		title: "Sheet",
		name: "sheet",
		type: "registry:example",
	},
	{
		title: "Slider",
		name: "slider",
		type: "registry:example",
	},
	{
		title: "Sonner",
		name: "sonner",
		type: "registry:example",
	},
	{
		title: "Skeleton",
		name: "skeleton",
		type: "registry:example",
	},
	{
		title: "Spinner",
		name: "spinner",
		type: "registry:example",
	},
	{
		title: "Switch",
		name: "switch",
		type: "registry:example",
	},
	{
		title: "Table",
		name: "table",
		type: "registry:example",
	},
	{
		title: "Tabs",
		name: "tabs",
		type: "registry:example",
	},
	{
		title: "Textarea",
		name: "textarea",
		type: "registry:example",
	},
	{
		title: "Toggle",
		name: "toggle",
		type: "registry:example",
	},
	{
		title: "Navigation Menu",
		name: "navigation-menu",
		type: "registry:example",
	},
	{
		title: "Pagination",
		name: "pagination",
		type: "registry:example",
	},
].toSorted((a, b) => a.title.localeCompare(b.title)) as Example[];
