// Explicit shared UI selectors; every matched class list is compared in full.
export const SHARED_DOCS_SURFACES = {
	"page-header": {
		description: "shared page-header class contracts",
		contracts: [
			{
				name: "content",
				local: "src/lib/components/page-header/page-header.svelte",
				upstream: "apps/v4/components/page-header.tsx",
				marker: ["items-center", "text-center", "container"],
			},
			{
				name: "heading",
				local: "src/lib/components/page-header/page-header-heading.svelte",
				upstream: "apps/v4/components/page-header.tsx",
				marker: ["xl:tracking-tighter", "lg:leading-[1.1]", "lg:font-semibold"],
			},
			{
				name: "description",
				local: "src/lib/components/page-header/page-header-description.svelte",
				upstream: "apps/v4/components/page-header.tsx",
				marker: ["text-foreground", "text-balance", "sm:text-lg"],
			},
			{
				name: "actions",
				local: "src/lib/components/page-header/page-actions.svelte",
				upstream: "apps/v4/components/page-header.tsx",
				marker: ["**:data-[slot=button]:shadow-none", "justify-center", "items-center"],
			},
		],
	},
	"site-header": {
		description: "shared site-header class contracts",
		contracts: [
			{
				name: "sticky header",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["bg-background", "sticky", "w-full"],
			},
			{
				name: "container",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: [
					"group-has-data-[slot=designer]/layout:max-w-none",
					"container-wrapper",
					"3xl:fixed:px-0",
				],
			},
			{
				name: "mobile navigation",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["lg:hidden", "flex"],
			},
			{
				name: "desktop navigation",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["lg:flex", "hidden"],
			},
			{
				name: "actions",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["md:justify-end", "items-center", "md:flex-1"],
			},
			{
				name: "search",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["md:flex-none", "md:w-auto", "md:flex"],
			},
			{
				name: "theme controls",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["lg:block", "hidden", "ml-2"],
			},
			{
				name: "primary button",
				local: "src/lib/components/site-header.svelte",
				upstream: "apps/v4/components/site-header.tsx",
				marker: ["rounded-lg", "h-[31px]"],
			},
		],
	},
	"site-footer": {
		description: "shared site-footer class contracts",
		contracts: [
			{
				name: "container",
				local: "src/lib/components/site-footer.svelte",
				upstream: "apps/v4/components/site-footer.tsx",
				marker: ["container-wrapper", "xl:px-6", "px-4"],
			},
			{
				name: "layout",
				local: "src/lib/components/site-footer.svelte",
				upstream: "apps/v4/components/site-footer.tsx",
				marker: ["h-(--footer-height)", "justify-between", "items-center"],
			},
			{
				name: "credits",
				local: "src/lib/components/site-footer.svelte",
				upstream: "apps/v4/components/site-footer.tsx",
				marker: ["text-muted-foreground", "leading-loose", "text-center"],
			},
			{
				name: "credit links",
				local: "src/lib/components/site-footer.svelte",
				upstream: "apps/v4/components/site-footer.tsx",
				marker: ["underline-offset-4", "font-medium", "underline"],
			},
		],
	},
	"docs-toc": {
		description: "shared docs-toc class contracts",
		contracts: [
			{
				name: "mobile trigger",
				local: "src/lib/components/docs-toc.svelte",
				upstream: "apps/v4/components/docs-toc.tsx",
				marker: ["md:h-7", "h-8"],
			},
			{
				name: "list",
				local: "src/lib/components/docs-toc.svelte",
				upstream: "apps/v4/components/docs-toc.tsx",
				marker: ["flex-col", "text-sm", "gap-2"],
			},
		],
	},
	"code-tabs": {
		description: "shared code-tabs class contracts",
		contracts: [
			{
				name: "installation tabs",
				local: "src/lib/components/code-tabs.svelte",
				upstream: "apps/v4/components/code-tabs.tsx",
				marker: ["*:data-[slot=tabs-list]:gap-6", "relative", "w-full"],
			},
		],
	},
	"code-collapsible-wrapper": {
		description: "shared code-collapsible-wrapper class contracts",
		contracts: [
			{
				name: "wrapper",
				local: "src/lib/components/code-collapsible-wrapper.svelte",
				upstream: "apps/v4/components/code-collapsible-wrapper.tsx",
				marker: ["group/collapsible", "relative", "md:-mx-1"],
			},
			{
				name: "expand button",
				local: "src/lib/components/code-collapsible-wrapper.svelte",
				upstream: "apps/v4/components/code-collapsible-wrapper.tsx",
				marker: ["text-muted-foreground", "rounded-md", "px-2"],
			},
			{
				name: "bottom trigger",
				local: "src/lib/components/code-collapsible-wrapper.svelte",
				upstream: "apps/v4/components/code-collapsible-wrapper.tsx",
				marker: [
					"group-data-[state=open]/collapsible:hidden",
					"text-muted-foreground",
					"bg-gradient-to-b",
				],
			},
		],
	},
	"docs-copy-page": {
		description: "shared docs-copy-page class contracts",
		contracts: [
			{
				name: "copy button",
				local: "src/lib/components/docs-copy-page.svelte",
				upstream: "apps/v4/components/docs-copy-page.tsx",
				marker: ["md:text-[0.8rem]", "shadow-none", "md:h-7"],
			},
			{
				name: "desktop label",
				local: "src/lib/components/docs-copy-page.svelte",
				upstream: "apps/v4/components/docs-copy-page.tsx",
				marker: ["sm:flex", "hidden"],
			},
			{
				name: "mobile label",
				local: "src/lib/components/docs-copy-page.svelte",
				upstream: "apps/v4/components/docs-copy-page.tsx",
				marker: ["sm:hidden", "flex"],
			},
			{
				name: "menu",
				local: "src/lib/components/docs-copy-page.svelte",
				upstream: "apps/v4/components/docs-copy-page.tsx",
				marker: ["dark:bg-background/60", "bg-background/70", "backdrop-blur-sm"],
			},
		],
	},
	"page-nav": {
		description: "shared page-nav class contracts",
		contracts: [
			{
				name: "container",
				local: "src/lib/components/page-nav.svelte",
				upstream: "apps/v4/components/page-nav.tsx",
				marker: ["justify-between", "items-center", "container"],
			},
		],
	},
};
