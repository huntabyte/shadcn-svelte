import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { npxShadcnSvelte } from "./utils.js";
import pkg from "../package.json" with { type: "json" };

export const server = new McpServer({
	name: "shadcn-svelte",
	version: pkg.version,
});

// Items are wrapped in double quotes in the returned command.
const itemSchema = z.union([z.string().regex(/^\w[\w-]*$/), z.url().regex(/^[^\s"]+$/)], {
	error:
		"Expected an item name like `button` or `data-table`, or a URL without spaces or double quotes.",
});

server.registerTool(
	"get_add_command_for_items",
	{
		description:
			"Get the shadcn-svelte CLI add command for specific items in a registry. This is useful for adding one or more components to your project.",
		inputSchema: z.object({
			items: z
				.array(itemSchema)
				.min(1)
				.describe(
					"Array of item names or URLs to get the add command for (e.g., ['button', 'data-table'])"
				),
		}),
	},
	async ({ items }) => ({
		content: [
			{
				type: "text",
				text: await npxShadcnSvelte(`add -y ${items.map((item) => `"${item}"`).join(" ")}`),
			},
		],
	})
);

server.registerTool(
	"get_audit_checklist",
	{
		description:
			"After creating new components or generating new code files, use this tool for a quick checklist to verify that everything is working as expected. Make sure to run the tool after all required steps have been completed.",
	},
	async () => ({
		content: [
			{
				type: "text",
				text: `## Component Audit Checklist

After adding or generating components, check the following common issues:

- [ ] Ensure imports are correct i.e named vs default imports
- [ ] Ensure all dependencies are installed.
- [ ] Check for linting errors or warnings
- [ ] Check for TypeScript errors
- [ ] Use the Playwright MCP if available.`,
			},
		],
	})
);
