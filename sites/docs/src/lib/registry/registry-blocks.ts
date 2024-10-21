import type { BlockName } from "./schema.js";
import type { Style } from "./styles.js";

type BlockMeta = {
	iframeHeight: string;
	className: string;
	description: string;
};

export const blockMeta: Record<Style["name"], Record<BlockName, BlockMeta>> = {
	default: {
		"sidebar-01": {
			iframeHeight: "800px",
			description: "A simple sidebar with navigation grouped by section.",
			className: "",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
		},
	},
	"new-york": {
		"sidebar-01": {
			iframeHeight: "800px",
			description: "A simple sidebar with navigation grouped by section.",
			className: "",
		},
		"sidebar-02": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible sections.",
		},
		"sidebar-03": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus.",
		},
		"sidebar-04": {
			iframeHeight: "800px",
			className: "",
			description: "A floating sidebar with submenus.",
		},
		"sidebar-05": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with collapsible submenus.",
		},
		"sidebar-06": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with submenus as dropdowns.",
		},
		"sidebar-07": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar that collapses to icons",
		},
		"sidebar-08": {
			iframeHeight: "800px",
			className: "",
			description: "An inset sidebar with secondary navigation.",
		},
		"sidebar-09": {
			iframeHeight: "800px",
			className: "",
			description: "Collapsible nested sidebars.",
		},
		"sidebar-10": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a popover.",
		},
		"sidebar-11": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a collapsible file tree.",
		},
		"sidebar-12": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar with a calendar.",
		},
		"sidebar-13": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar in a dialog.",
		},
		"sidebar-14": {
			iframeHeight: "800px",
			className: "",
			description: "A sidebar on the right.",
		},
		"sidebar-15": {
			iframeHeight: "800px",
			className: "",
			description: "A left and right sidebar.",
		},
		"login-01": {
			iframeHeight: "870px",
			className: "w-full h-full",
			description: "A simple login form.",
		},
	},
};
