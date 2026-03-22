import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { OFFICIAL_REGISTRY_URL } from "../constants.js";
import { CLIError } from "../utils/errors.js";
import {
	getRegistryIndex,
	getRegistryUrl,
	resolveRegistryItems,
	fetchRegistryItems,
} from "../utils/registry/index.js";
import type { RegistryIndex, RegistryItem } from "../utils/registry/schema.js";

import {
	formatItemExamples,
	formatRegistryItems,
	formatSearchResultsWithPagination,
	getDefaultMcpConfig,
	getMcpConfig,
	npxCommand,
	paginateItems,
	registryIndexToSearchItems,
	type SearchResultItem,
} from "./utils.js";

// @ts-expect-error -- CJS vendored module
import fuzzysort from "../vendored/fuzzysort.js";

export const server = new Server(
	{
		name: "shadcn-svelte",
		version: "1.0.0",
	},
	{
		capabilities: {
			resources: {},
			tools: {},
		},
	}
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: "get_project_registries",
				description:
					"Get the configured registry URL from components.json - Returns error if no components.json exists (use init to create one)",
				inputSchema: z.toJSONSchema(z.object({})),
			},
			{
				name: "list_items_in_registries",
				description:
					"List all available components and items from the registry (requires components.json - use init if missing)",
				inputSchema: z.toJSONSchema(
					z.object({
						limit: z
							.number()
							.optional()
							.describe("Maximum number of items to return"),
						offset: z
							.number()
							.optional()
							.describe("Number of items to skip for pagination"),
					})
				),
			},
			{
				name: "search_items_in_registries",
				description:
					"Search for components in the registry using fuzzy matching (requires components.json). After finding an item, use get_item_examples_from_registries to see usage examples.",
				inputSchema: z.toJSONSchema(
					z.object({
						query: z
							.string()
							.describe(
								"Search query string for fuzzy matching against item names and descriptions"
							),
						limit: z
							.number()
							.optional()
							.describe("Maximum number of items to return"),
						offset: z
							.number()
							.optional()
							.describe("Number of items to skip for pagination"),
					})
				),
			},
			{
				name: "view_items_in_registries",
				description:
					"View detailed information about specific registry items including the name, description, type, file contents, and dependencies. For usage examples, use get_item_examples_from_registries instead.",
				inputSchema: z.toJSONSchema(
					z.object({
						items: z
							.array(z.string())
							.describe(
								"Array of item names (e.g., ['button', 'card', 'dialog'])"
							),
					})
				),
			},
			{
				name: "get_item_examples_from_registries",
				description:
					"Find usage examples and demos with their complete code. Search for patterns like 'accordion-demo', 'button example', 'card-demo', etc. Returns full implementation code with dependencies.",
				inputSchema: z.toJSONSchema(
					z.object({
						query: z
							.string()
							.describe(
								"Search query for examples (e.g., 'accordion-demo', 'button demo', 'card example', 'tooltip-demo'). Common patterns: '{item-name}-demo', '{item-name} example'"
							),
					})
				),
			},
			{
				name: "get_add_command_for_items",
				description:
					"Get the shadcn-svelte CLI add command for specific items. This is useful for adding one or more components to your project.",
				inputSchema: z.toJSONSchema(
					z.object({
						items: z
							.array(z.string())
							.describe(
								"Array of item names to get the add command for (e.g., ['button', 'card'])"
							),
					})
				),
			},
			{
				name: "get_audit_checklist",
				description:
					"After creating new components or generating new code files, use this tool for a quick checklist to verify that everything is working as expected.",
				inputSchema: z.toJSONSchema(z.object({})),
			},
		],
	};
});

async function getRegistryConfig(cwd: string) {
	const config = getMcpConfig(cwd);
	if (config) return config;
	return getDefaultMcpConfig();
}

async function fetchIndex(registryUrl: string): Promise<RegistryIndex> {
	return getRegistryIndex(registryUrl);
}

function searchItems(
	items: SearchResultItem[],
	query: string
): SearchResultItem[] {
	const results = fuzzysort.go(query, items, {
		keys: ["name", "title", "description"],
		threshold: -10000,
		limit: 100,
	});
	return results.map((result: { obj: SearchResultItem }) => result.obj);
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	try {
		if (!request.params.arguments) {
			throw new Error("No tool arguments provided.");
		}

		switch (request.params.name) {
			case "get_project_registries": {
				const config = getMcpConfig(process.cwd());

				if (!config) {
					return {
						content: [
							{
								type: "text" as const,
								text: `No components.json found or no registry configured.

To fix this:
1. Run \`${npxCommand("init")}\` to create a components.json file
2. Or manually create components.json with a registry URL`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text" as const,
							text: `The following registry is configured in the current project:

- ${config.registry} (style: ${config.style})

Registry URL: ${config.registryUrl}

You can list available items by using the list_items_in_registries tool.`,
						},
					],
				};
			}

			case "list_items_in_registries": {
				const inputSchema = z.object({
					limit: z.number().optional(),
					offset: z.number().optional(),
				});

				const args = inputSchema.parse(request.params.arguments);
				const config = await getRegistryConfig(process.cwd());
				const index = await fetchIndex(config.registryUrl);
				const allItems = registryIndexToSearchItems(index);
				const results = paginateItems(allItems, {
					limit: args.limit,
					offset: args.offset,
				});

				if (results.items.length === 0) {
					return {
						content: [
							{
								type: "text" as const,
								text: "No items found in the registry.",
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text" as const,
							text: formatSearchResultsWithPagination(results),
						},
					],
				};
			}

			case "search_items_in_registries": {
				const inputSchema = z.object({
					query: z.string(),
					limit: z.number().optional(),
					offset: z.number().optional(),
				});

				const args = inputSchema.parse(request.params.arguments);
				const config = await getRegistryConfig(process.cwd());
				const index = await fetchIndex(config.registryUrl);
				const allItems = registryIndexToSearchItems(index);
				const searched = searchItems(allItems, args.query);
				const results = paginateItems(searched, {
					limit: args.limit,
					offset: args.offset,
				});

				if (results.items.length === 0) {
					return {
						content: [
							{
								type: "text" as const,
								text: `No items found matching "${args.query}". Try searching with a different query.`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: "text" as const,
							text: formatSearchResultsWithPagination(results, {
								query: args.query,
							}),
						},
					],
				};
			}

			case "view_items_in_registries": {
				const inputSchema = z.object({
					items: z.array(z.string()),
				});

				const args = inputSchema.parse(request.params.arguments);
				const config = await getRegistryConfig(process.cwd());
				const index = await fetchIndex(config.registryUrl);

				const resolved = await resolveRegistryItems({
					registryUrl: config.registryUrl,
					registryIndex: index,
					items: args.items,
				});

				const registryItems = await fetchRegistryItems({
					baseUrl: config.registryUrl,
					items: resolved,
				});

				if (registryItems.length === 0) {
					return {
						content: [
							{
								type: "text" as const,
								text: `No items found for: ${args.items.join(", ")}

Make sure the item names are correct (e.g., button, card, dialog).`,
							},
						],
					};
				}

				const formattedItems = formatRegistryItems(registryItems);

				return {
					content: [
						{
							type: "text" as const,
							text: `Item Details:\n\n${formattedItems.join("\n\n---\n\n")}`,
						},
					],
				};
			}

			case "get_item_examples_from_registries": {
				const inputSchema = z.object({
					query: z.string(),
				});

				const args = inputSchema.parse(request.params.arguments);
				const config = await getRegistryConfig(process.cwd());
				const index = await fetchIndex(config.registryUrl);
				const allItems = registryIndexToSearchItems(index);
				const searched = searchItems(allItems, args.query);

				if (searched.length === 0) {
					return {
						content: [
							{
								type: "text" as const,
								text: `No examples found for query "${args.query}".

Try searching with patterns like:
- "accordion-demo" for accordion examples
- "button demo" or "button example"
- Component name followed by "-demo" or "example"

You can also:
1. Use search_items_in_registries to find all items matching your query
2. View the main component with view_items_in_registries for inline usage documentation`,
							},
						],
					};
				}

				const itemNames = searched.map((item) => item.name);
				const resolved = await resolveRegistryItems({
					registryUrl: config.registryUrl,
					registryIndex: index,
					items: itemNames,
				});

				const fullItems = await fetchRegistryItems({
					baseUrl: config.registryUrl,
					items: resolved,
				});

				return {
					content: [
						{
							type: "text" as const,
							text: formatItemExamples(fullItems, args.query),
						},
					],
				};
			}

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
							text: npxCommand(`add ${args.items.join(" ")}`),
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

- [ ] Ensure \`components.json\` exists and is valid
- [ ] Ensure imports are correct (check \`$lib\` alias paths match your config)
- [ ] Ensure all dependencies are installed (check \`bits-ui\` and other required packages)
- [ ] Verify component import paths match the aliases configured in \`components.json\`
- [ ] Check that Tailwind CSS is properly imported in your global CSS file
- [ ] If using Svelte 5, ensure rune syntax (\`$state\`, \`$derived\`, \`$effect\`) is used correctly
- [ ] Check for TypeScript errors
- [ ] Check for linting errors or warnings
- [ ] Verify that SvelteKit routes (\`+page.svelte\`, \`+layout.svelte\`) are structured correctly`,
						},
					],
				};
			}

			default:
				throw new Error(`Tool ${request.params.name} not found`);
		}
	} catch (err) {
		if (err instanceof z.ZodError) {
			return {
				content: [
					{
						type: "text" as const,
						text: `Invalid input parameters:\n${err.errors.map((e) => `- ${e.path.join(".")}: ${e.message}`).join("\n")}`,
					},
				],
				isError: true,
			};
		}

		if (err instanceof CLIError) {
			return {
				content: [
					{
						type: "text" as const,
						text: `Error: ${err.message}`,
					},
				],
				isError: true,
			};
		}

		const errorMessage = err instanceof Error ? err.message : String(err);
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
});
