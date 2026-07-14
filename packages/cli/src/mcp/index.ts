import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { error } from "../utils/errors.js";
import * as registry from "../utils/registry/index.js";
import * as cliConfig from "../utils/config/index.js";
import type { RegistryIndexItem, RegistryItemType } from "../utils/registry/schema.js";
import {
	findUnknownTypesMessage,
	formatAddCommand,
	formatExamples,
	formatRegistryItems,
	formatSearchResults,
	searchRegistryItems,
} from "./utils.js";

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
				name: "get_project_registry",
				description:
					"Get the configured shadcn-svelte registry from components.json. Returns an error if no components.json exists.",
				inputSchema: emptyObjectSchema,
			},
			{
				name: "list_items_in_registry",
				description:
					"List items from the configured shadcn-svelte registry. Requires components.json.",
				inputSchema: listItemsSchema,
			},
			{
				name: "search_items_in_registry",
				description:
					"Search for components and other items in the configured shadcn-svelte registry using fuzzy matching.",
				inputSchema: searchItemsSchema,
			},
			{
				name: "view_items_in_registry",
				description:
					"View detailed information about specific registry items including file contents.",
				inputSchema: itemsSchema,
			},
			{
				name: "get_item_examples_from_registry",
				description:
					"Find usage examples and demos with their complete code. Search for patterns like button demo, card example, or login form.",
				inputSchema: querySchema,
			},
			{
				name: "get_add_command_for_items",
				description:
					"Get the shadcn-svelte CLI add command for one or more items in the configured registry.",
				inputSchema: itemsSchema,
			},
			{
				name: "get_audit_checklist",
				description:
					"After adding or generating components, use this tool for a checklist to verify the result.",
				inputSchema: emptyObjectSchema,
			},
		],
	};
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	try {
		const toolName = request.params.name;
		const args = request.params.arguments ?? {};

		switch (toolName) {
			case "get_project_registry": {
				const config = await getConfig();
				return textContent(`Configured registry: ${config.registry}`);
			}

			case "list_items_in_registry": {
				const input = z
					.object({
						types: z.array(z.string()).optional(),
						limit: z.number().optional(),
						offset: z.number().optional(),
					})
					.parse(args);

				const unknownTypesMessage = findUnknownTypesMessage(input.types);
				if (unknownTypesMessage) {
					return textContent(unknownTypesMessage, true);
				}

				const config = await getConfig();
				const registryUrl = registry.getRegistryUrl(config);
				const index = await registry.getRegistryIndex(registryUrl);
				const items = filterByTypes(index, input.types);

				return textContent(
					formatSearchResults(items, {
						limit: input.limit ?? 100,
						offset: input.offset ?? 0,
						registryUrl,
					})
				);
			}

			case "search_items_in_registry": {
				const input = z
					.object({
						query: z.string(),
						types: z.array(z.string()).optional(),
						limit: z.number().optional(),
						offset: z.number().optional(),
					})
					.parse(args);

				const unknownTypesMessage = findUnknownTypesMessage(input.types);
				if (unknownTypesMessage) {
					return textContent(unknownTypesMessage, true);
				}

				const config = await getConfig();
				const registryUrl = registry.getRegistryUrl(config);
				const index = await registry.getRegistryIndex(registryUrl);
				const results = searchRegistryItems(filterByTypes(index, input.types), input.query);

				if (results.length === 0) {
					return textContent(
						`No items found matching "${input.query}". Try a different query or item type.`
					);
				}

				return textContent(
					formatSearchResults(results, {
						query: input.query,
						limit: input.limit ?? 100,
						offset: input.offset ?? 0,
						registryUrl,
					})
				);
			}

			case "view_items_in_registry": {
				const input = z.object({ items: z.array(z.string()) }).parse(args);
				const config = await getConfig();
				const registryUrl = registry.getRegistryUrl(config);
				const index = await registry.getRegistryIndex(registryUrl);
				const resolvedItems = await registry.resolveRegistryItems({
					registryUrl,
					registryIndex: index,
					items: input.items,
				});
				const fullItems = await registry.fetchRegistryItems({
					baseUrl: registryUrl,
					items: resolvedItems,
				});

				if (fullItems.length === 0) {
					return textContent(`No items found for: ${input.items.join(", ")}`);
				}

				return textContent(formatRegistryItems(fullItems));
			}

			case "get_item_examples_from_registry": {
				const input = z.object({ query: z.string() }).parse(args);
				const config = await getConfig();
				const registryUrl = registry.getRegistryUrl(config);
				const index = await registry.getRegistryIndex(registryUrl);
				const examples = searchRegistryItems(index, input.query).filter((item) =>
					[
						"registry:example",
						"registry:block",
						"registry:component",
						"registry:page",
					].includes(item.type)
				);

				if (examples.length === 0) {
					return textContent(
						`No examples found for query "${input.query}". Try patterns like "button demo", "accordion example", or "login form".`
					);
				}

				const resolvedItems = await registry.resolveRegistryItems({
					registryUrl,
					registryIndex: index,
					items: examples.slice(0, 10).map((item) => item.name),
				});
				const fullItems = await registry.fetchRegistryItems({
					baseUrl: registryUrl,
					items: resolvedItems,
				});

				return textContent(formatExamples(fullItems, input.query));
			}

			case "get_add_command_for_items": {
				const input = z.object({ items: z.array(z.string()) }).parse(args);
				return textContent(formatAddCommand(input.items));
			}

			case "get_audit_checklist": {
				return textContent(`# Component Audit Checklist

- Ensure imports use the correct shadcn-svelte namespace and Svelte file paths.
- Ensure required dependencies are installed.
- Check for TypeScript errors.
- Run linting and formatting checks.
- Verify the component renders in the target page or route.`);
			}

			default:
				throw error(`Tool ${toolName} not found.`);
		}
	} catch (e) {
		const message = e instanceof Error ? e.message : String(e);
		return textContent(`Error: ${message}`, true);
	}
});

async function getConfig() {
	const config = await cliConfig.getConfig(process.cwd());
	if (!config) {
		throw error(
			"No components.json found. Run `shadcn-svelte init` to create one before using the MCP server."
		);
	}

	return config;
}

function filterByTypes(items: RegistryIndexItem[], types?: string[]) {
	if (!types?.length) return items;
	const normalized = new Set(types.map(normalizeType));
	return items.filter((item) => normalized.has(item.type));
}

function normalizeType(type: string): RegistryItemType {
	return type.startsWith("registry:")
		? (type as RegistryItemType)
		: (`registry:${type}` as RegistryItemType);
}

function textContent(text: string, isError = false) {
	return {
		content: [{ type: "text" as const, text }],
		isError,
	};
}

const emptyObjectSchema = {
	type: "object",
	properties: {},
	additionalProperties: false,
} as const;

const typeFilterProperties = {
	types: {
		type: "array",
		items: { type: "string" },
		description: "Filter by item type, for example ui, block, component, lib, hook.",
	},
	limit: {
		type: "number",
		description: "Maximum number of items to return. Defaults to 100. Use 0 for no limit.",
	},
	offset: {
		type: "number",
		description: "Number of items to skip for pagination.",
	},
} as const;

const listItemsSchema = {
	type: "object",
	properties: typeFilterProperties,
	additionalProperties: false,
} as const;

const searchItemsSchema = {
	type: "object",
	properties: {
		query: {
			type: "string",
			description: "Search query string for fuzzy matching.",
		},
		...typeFilterProperties,
	},
	required: ["query"],
	additionalProperties: false,
} as const;

const itemsSchema = {
	type: "object",
	properties: {
		items: {
			type: "array",
			items: { type: "string" },
			description: "Array of item names, for example button, card, login-01.",
		},
	},
	required: ["items"],
	additionalProperties: false,
} as const;

const querySchema = {
	type: "object",
	properties: {
		query: {
			type: "string",
			description: "Search query for examples and demos.",
		},
	},
	required: ["query"],
	additionalProperties: false,
} as const;
