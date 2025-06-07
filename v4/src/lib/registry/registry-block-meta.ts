import { type BlockName } from "$lib/blocks.js";

type BlockMeta = {
	iframeHeight?: string;
	className?: string;
	description: string;
	mobile?: "component";
};

export const blockMeta = {
	"sidebar-01": {
		description: "A simple sidebar with navigation grouped by section.",
	},
	"sidebar-02": {
		description: "A sidebar with collapsible sections.",
	},
	"sidebar-03": {
		description: "A sidebar with submenus.",
	},
	"sidebar-04": {
		description: "A floating sidebar with submenus.",
	},
	"sidebar-05": {
		description: "A sidebar with collapsible submenus.",
	},
	"sidebar-06": {
		description: "A sidebar with submenus as dropdowns.",
	},
	"sidebar-07": {
		description: "A sidebar that collapses to icons",
	},
	"sidebar-08": {
		description: "An inset sidebar with secondary navigation.",
	},
	"sidebar-09": {
		description: "Collapsible nested sidebars.",
	},
	"sidebar-10": {
		description: "A sidebar in a popover.",
	},
	"sidebar-11": {
		description: "A sidebar with a collapsible file tree.",
	},
	"sidebar-12": {
		description: "A sidebar with a calendar.",
	},
	"sidebar-13": {
		description: "A sidebar in a dialog.",
	},
	"sidebar-14": {
		description: "A sidebar on the right.",
	},
	"sidebar-15": {
		description: "A left and right sidebar.",
	},
	"sidebar-16": {
		description: "A sidebar with a sticky site header.",
	},
	"login-01": {
		description: "A simple login form.",
	},
	"login-02": {
		description: "A login page with a muted background color.",
	},
	"login-03": {
		description: "A login page with a background image.",
	},
	"login-04": {
		description: "A login page with form and image.",
	},
	"dashboard-01": {
		description: "A dashboard with sidebar, charts and data table.",
	},
	"demo-sidebar": {
		description: "Your first sidebar.",
	},
	"demo-sidebar-header": {
		description: "A sidebar header with a dropdown menu.",
	},
	"demo-sidebar-footer": {
		description: "A sidebar footer with a dropdown menu.",
	},
	"demo-sidebar-group": {
		description: "A sidebar group.",
	},
	"demo-sidebar-group-collapsible": {
		description: "A sidebar with a collapsible group.",
	},
	"demo-sidebar-group-action": {
		description: "A sidebar with a group action.",
	},
	"demo-sidebar-menu": {
		description: "A sidebar menu with a list of projects.",
	},
	"demo-sidebar-menu-action": {
		description: "A sidebar menu action with a dropdown menu.",
	},
	"demo-sidebar-menu-sub": {
		description: "A sidebar menu sub.",
	},
	"demo-sidebar-menu-collapsible": {
		description: "A collapsible sidebar menu.",
	},
	"demo-sidebar-menu-badge": {
		description: "A sidebar menu badge.",
	},
	"demo-sidebar-controlled": {
		description: "A controlled sidebar.",
	},
	"calendar-01": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
		mobile: "component",
	},
	"calendar-02": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
		mobile: "component",
	},
	"calendar-03": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
		mobile: "component",
	},
	"calendar-04": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0 xl:pt-28",
		mobile: "component",
	},
	"calendar-05": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-06": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-07": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-08": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-09": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-10": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-11": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-12": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-13": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-14": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-15": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-16": {
		iframeHeight: "600px",
		className: "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
		mobile: "component",
	},
	"calendar-17": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-18": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-19": {
		iframeHeight: "600px",
		className: "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
		mobile: "component",
	},
	"calendar-20": {
		iframeHeight: "600px",
		className: "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
		mobile: "component",
	},
	"calendar-21": {
		iframeHeight: "600px",
		className: "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
		mobile: "component",
	},
	"calendar-22": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-23": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-24": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-25": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-26": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-27": {
		iframeHeight: "600px",
		className: "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
		mobile: "component",
	},
	"calendar-28": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-29": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-30": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
	"calendar-31": {
		iframeHeight: "700px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0",
		mobile: "component",
	},
	"calendar-32": {
		iframeHeight: "600px",
		className:
			"w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
		mobile: "component",
	},
} as Record<BlockName, BlockMeta>;
