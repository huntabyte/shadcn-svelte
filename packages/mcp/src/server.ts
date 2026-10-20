import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { npxShadcnSvelte } from "./utils.js";

export const server = new Server(
	{
		name: "shadcn-svelte",
		version: "1.0.0",
	},
	{
		capabilities: {
			logging: {},
			resources: {},
			tools: {},
		},
	}
);

// Keep the draft-07 tool schemas clients already receive.
function toJsonSchema(schema: z.ZodType) {
	return z.toJSONSchema(schema, { target: "draft-7" });
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: "get_add_command_for_items",
				description:
					"Get the shadcn-svelte CLI add command for specific items in a registry. This is useful for adding one or more components to your project.",
				inputSchema: toJsonSchema(
					z.object({
						items: z
							.array(z.string())
							.describe("Array of items to get the add command for (e.g., ['button', 'card'])"),
					})
				),
			},
			{
				name: "get_audit_checklist",
				description:
					"After creating new components or generating new code files, use this tool for a quick checklist to verify that everything is working as expected. Make sure to run the tool after all required steps have been completed.",
				inputSchema: toJsonSchema(z.object({})),
			},
		],
	};
});

server.setRequestHandler(CallToolRequestSchema, async (request) => handleCallTool(request));

async function handleCallTool(request: {
	params: { name: string; arguments?: Record<string, unknown> };
}) {
	try {
		if (!request.params.arguments) {
			throw new Error("No tool arguments provided.");
		}

		switch (request.params.name) {
			case "get_add_command_for_items": {
				const args = z
					.object({
						items: z.array(z.string()),
					})
					.parse(request.params.arguments);

				return {
					content: [
						{
							type: "text" as const,
							text: await npxShadcnSvelte(`add ${args.items.join(" ")}`),
						},
					],
				};
			}

			case "get_audit_checklist": {
				return {
					content: [
						{
							type: "text" as const,
							text: `## Component Audit Checklist

After adding or generating components, check the following common issues:

- [ ] Ensure imports are correct i.e named vs default imports
- [ ] Ensure all dependencies are installed.
- [ ] Check for linting errors or warnings
- [ ] Check for TypeScript errors
- [ ] Use the Playwright MCP if available.`,
						},
					],
				};
			}

			default:
				throw new Error(`Tool ${request.params.name} not found`);
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				content: [
					{
						type: "text" as const,
						text: `Invalid input parameters:
${error.issues.map((e) => `- ${e.path.join(".")}: ${e.message}`).join("\n")}`,
					},
				],
				isError: true,
			};
		}

		const errorMessage = error instanceof Error ? error.message : String(error);
		return {
			content: [
				{
					type: "text" as const,
					text: `Error: ${errorMessage}`,
				},
			],
			isError: true,
		};
	}
}
