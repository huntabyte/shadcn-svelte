import * as z from "zod";

// This also defines the order they appear on the blocks page.
export const blockNames = [
	"sidebar-01",
	"sidebar-02",
	"sidebar-03",
	"sidebar-04",
	"sidebar-05",
	"sidebar-06",
	"sidebar-07",
	"sidebar-08",
	"sidebar-09",
	"sidebar-10",
	"sidebar-11",
	"sidebar-12",
	"sidebar-13",
	"sidebar-14",
	"sidebar-15",
	"login-01",
	"demo-sidebar",
	"demo-sidebar-header",
	"demo-sidebar-footer",
	"demo-sidebar-group",
	"demo-sidebar-group-collapsible",
	"demo-sidebar-group-action",
	"demo-sidebar-menu",
	"demo-sidebar-menu-action",
	"demo-sidebar-menu-sub",
	"demo-sidebar-menu-collapsible",
	"demo-sidebar-menu-badge",
	"demo-sidebar-controlled",
] as const;

export type BlockName = (typeof blockNames)[number];

export const blockSchema = z.object({
	name: z.enum(blockNames),
	type: z.literal("registry:block"),
	description: z.string(),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
	code: z.string(),
	highlightedCode: z.string().default(""),
});

export type Block = z.infer<typeof blockSchema>;

export function isBlockName(str: string): str is BlockName {
	return blockNames.includes(str as never);
}
