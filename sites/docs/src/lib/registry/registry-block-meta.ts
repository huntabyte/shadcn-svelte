import { isBlockName, type BlockName } from "./schema.js";
import type { Style } from "./styles.js";

type BlockMeta = {
	iframeHeight: string;
	className: string;
	description: string;
	target: string;
};

export const blockMeta: Record<Style["name"], Record<BlockName, BlockMeta>> = {
	default: {
		"sidebar-01": {
			iframeHeight: "800px",
			description: "A simple sidebar with navigation grouped by section.",
			className: "",
			target: "sidebar-page.svelte",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
			target: "sidebar-page.svelte",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
			target: "sidebar-page.svelte",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
			target: "sidebar-page.svelte",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
			target: "sidebar-page.svelte",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
			target: "sidebar-page.svelte",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
			target: "sidebar-page.svelte",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
			target: "sidebar-page.svelte",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
			target: "sidebar-page.svelte",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
			target: "sidebar-page.svelte",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
			target: "sidebar-page.svelte",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
			target: "sidebar-page.svelte",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
			target: "login-page.svelte",
		},
		"demo-sidebar": {
			iframeHeight: "",
			className: "",
			description: "Your first sidebar.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-header": {
			iframeHeight: "",
			className: "",
			description: "A sidebar header with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-footer": {
			iframeHeight: "",
			className: "",
			description: "A sidebar footer with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group": {
			iframeHeight: "",
			className: "",
			description: "A sidebar group.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a collapsible group.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a group action.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu with a list of projects.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu action with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-sub": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu sub.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A collapsible sidebar menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-badge": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu badge.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-controlled": {
			iframeHeight: "",
			className: "",
			description: "A controlled sidebar.",
			target: "sidebar-page.svelte",
		},
	},
	"new-york": {
		"sidebar-01": {
			iframeHeight: "800px",
			description: "A simple sidebar with navigation grouped by section.",
			className: "",
			target: "sidebar-page.svelte",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
			target: "sidebar-page.svelte",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
			target: "sidebar-page.svelte",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
			target: "sidebar-page.svelte",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
			target: "sidebar-page.svelte",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
			target: "sidebar-page.svelte",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
			target: "sidebar-page.svelte",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
			target: "sidebar-page.svelte",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
			target: "sidebar-page.svelte",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
			target: "sidebar-page.svelte",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
			target: "sidebar-page.svelte",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
			target: "sidebar-page.svelte",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
			target: "sidebar-page.svelte",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
			target: "login-page.svelte",
		},
		"demo-sidebar": {
			iframeHeight: "",
			className: "",
			description: "Your first sidebar.",
			target: "",
		},
		"demo-sidebar-header": {
			iframeHeight: "",
			className: "",
			description: "A sidebar header with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-footer": {
			iframeHeight: "",
			className: "",
			description: "A sidebar footer with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group": {
			iframeHeight: "",
			className: "",
			description: "A sidebar group.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a collapsible group.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-group-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a group action.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu with a list of projects.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu action with a dropdown menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-sub": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu sub.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A collapsible sidebar menu.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-menu-badge": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu badge.",
			target: "sidebar-page.svelte",
		},
		"demo-sidebar-controlled": {
			iframeHeight: "",
			className: "",
			description: "A controlled sidebar.",
			target: "sidebar-page.svelte",
		},
	},
};

export function getPageBlockTarget(blockName: string) {
	if (isBlockName(blockName)) {
		return blockMeta["default"][blockName].target;
	} else {
		throw new Error("Not a valid block name with a target.");
	}
}
