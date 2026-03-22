import { OFFICIAL_REGISTRY_URL } from "../constants.js";
import { loadConfig } from "../utils/config/utils.js";
import { getRegistryUrl } from "../utils/registry/index.js";
import type { RegistryIndex, RegistryItem } from "../utils/registry/schema.js";

const CLI_COMMAND = "shadcn-svelte@latest";

export function npxCommand(command: string) {
	return `npx ${CLI_COMMAND} ${command}`;
}

export type McpConfig = {
	registry: string;
	registryUrl: string;
	style: string;
};

export function getMcpConfig(cwd: string): McpConfig | undefined {
	try {
		const config = loadConfig(cwd);
		if (!config) return undefined;

		const registry = config.registry ?? OFFICIAL_REGISTRY_URL;
		const style = config.style ?? "vega";
		const registryUrl = getRegistryUrl({ registry, style });

		return { registry, registryUrl, style };
	} catch {
		return undefined;
	}
}

export function getDefaultMcpConfig(): McpConfig {
	const registry = OFFICIAL_REGISTRY_URL;
	const style = "vega";
	const registryUrl = getRegistryUrl({ registry, style });
	return { registry, registryUrl, style };
}

export type SearchResult = {
	items: SearchResultItem[];
	pagination: {
		total: number;
		offset: number;
		limit: number;
		hasMore: boolean;
	};
};

export type SearchResultItem = {
	name: string;
	type?: string;
	title?: string;
	description?: string;
};

export function paginateItems<T>(
	items: T[],
	options?: { limit?: number; offset?: number }
): { items: T[]; pagination: SearchResult["pagination"] } {
	const offset = options?.offset ?? 0;
	const limit = options?.limit ?? items.length;
	const total = items.length;

	return {
		items: items.slice(offset, offset + limit),
		pagination: {
			total,
			offset,
			limit,
			hasMore: offset + limit < total,
		},
	};
}

export function formatSearchResultsWithPagination(
	results: SearchResult,
	options?: { query?: string }
) {
	const { query } = options ?? {};

	const formattedItems = results.items.map((item) => {
		const parts: string[] = [`- ${item.name}`];

		if (item.type) {
			parts.push(`(${item.type})`);
		}

		if (item.description) {
			parts.push(`- ${item.description}`);
		}

		parts.push(`\n  Add command: \`${npxCommand(`add ${item.name}`)}\``);

		return parts.join(" ");
	});

	let header = `Found ${results.pagination.total} items`;
	if (query) {
		header += ` matching "${query}"`;
	}
	header += ":";

	const showingRange = `Showing items ${results.pagination.offset + 1}-${Math.min(results.pagination.offset + results.pagination.limit, results.pagination.total)} of ${results.pagination.total}:`;

	let output = `${header}\n\n${showingRange}\n\n${formattedItems.join("\n\n")}`;

	if (results.pagination.hasMore) {
		output += `\n\nMore items available. Use offset: ${results.pagination.offset + results.pagination.limit} to see the next page.`;
	}

	return output;
}

export function formatRegistryItems(items: RegistryItem[]) {
	return items.map((item) => {
		const parts: string[] = [
			`## ${item.name}`,
			item.description ? `\n${item.description}\n` : "",
			item.type ? `**Type:** ${item.type}` : "",
			item.files && item.files.length > 0
				? `**Files:** ${item.files.length} file(s)`
				: "",
			item.dependencies && item.dependencies.length > 0
				? `**Dependencies:** ${item.dependencies.join(", ")}`
				: "",
			item.devDependencies && item.devDependencies.length > 0
				? `**Dev Dependencies:** ${item.devDependencies.join(", ")}`
				: "",
		];

		// Include file contents
		if (item.files && item.files.length > 0) {
			parts.push("\n**File Contents:**");
			for (const file of item.files) {
				if (file.content) {
					const ext = file.target.split(".").pop() ?? "svelte";
					parts.push(`\n### ${file.target}\n`);
					parts.push(`\`\`\`${ext}`);
					parts.push(file.content);
					parts.push("```");
				}
			}
		}

		return parts.filter(Boolean).join("\n");
	});
}

export function formatItemExamples(items: RegistryItem[], query: string) {
	const sections = items.map((item) => {
		const parts: string[] = [
			`## Example: ${item.name}`,
			item.description ? `\n${item.description}\n` : "",
		];

		if (item.files?.length) {
			for (const file of item.files) {
				if (file.content) {
					const ext = file.target.split(".").pop() ?? "svelte";
					parts.push(`### Code (${file.target}):\n`);
					parts.push(`\`\`\`${ext}`);
					parts.push(file.content);
					parts.push("```");
				}
			}
		}

		return parts.filter(Boolean).join("\n");
	});

	const header = `# Usage Examples\n\nFound ${items.length} example${items.length > 1 ? "s" : ""} matching "${query}":\n`;

	return header + sections.join("\n\n---\n\n");
}

export function registryIndexToSearchItems(
	index: RegistryIndex
): SearchResultItem[] {
	return index.map((item) => ({
		name: item.name,
		type: item.type,
		title: item.title,
		description: item.description,
	}));
}
