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
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
			target: "src/routes/login/+page.svelte",
		},
		"demo-sidebar": {
			iframeHeight: "",
			className: "",
			description: "Your first sidebar.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-header": {
			iframeHeight: "",
			className: "",
			description: "A sidebar header with a dropdown menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-footer": {
			iframeHeight: "",
			className: "",
			description: "A sidebar footer with a dropdown menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group": {
			iframeHeight: "",
			className: "",
			description: "A sidebar group.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a collapsible group.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a group action.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu with a list of projects.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu action with a dropdown menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-sub": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu sub.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A collapsible sidebar menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-badge": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu badge.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-controlled": {
			iframeHeight: "",
			className: "",
			description: "A controlled sidebar.",
			target: "src/routes/dashboard/+page.svelte",
		},
	},
	"new-york": {
		"sidebar-01": {
			iframeHeight: "800px",
			description: "A simple sidebar with navigation grouped by section.",
			className: "",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
			target: "src/routes/login/+page.svelte",
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
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-footer": {
			iframeHeight: "",
			className: "",
			description: "A sidebar footer with a dropdown menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group": {
			iframeHeight: "",
			className: "",
			description: "A sidebar group.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a collapsible group.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-group-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar with a group action.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu with a list of projects.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-action": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu action with a dropdown menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-sub": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu sub.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-collapsible": {
			iframeHeight: "",
			className: "",
			description: "A collapsible sidebar menu.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-menu-badge": {
			iframeHeight: "",
			className: "",
			description: "A sidebar menu badge.",
			target: "src/routes/dashboard/+page.svelte",
		},
		"demo-sidebar-controlled": {
			iframeHeight: "",
			className: "",
			description: "A controlled sidebar.",
			target: "src/routes/dashboard/+page.svelte",
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
