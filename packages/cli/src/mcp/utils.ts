import type {
	RegistryIndexItem,
	RegistryItem,
	RegistryItemType,
} from "../utils/registry/schema.js";
import fuzzysort from "fuzzysort";

const SEARCHABLE_TYPES = [
	"registry:ui",
	"registry:block",
	"registry:component",
	"registry:lib",
	"registry:hook",
	"registry:page",
	"registry:file",
	"registry:theme",
	"registry:style",
	"registry:font",
	"registry:example",
	"registry:base",
] as const satisfies readonly RegistryItemType[];

type SearchableType = (typeof SEARCHABLE_TYPES)[number];

type SearchOptions = {
	query?: string;
	limit: number;
	offset: number;
	registryUrl: string;
};

export function searchRegistryItems(items: RegistryIndexItem[], query: string) {
	const results = fuzzysort.go(query, items, {
		keys: ["name", "title", "description", "type"],
		all: true,
		limit: 1000,
	});

	return results.map((result) => result.obj);
}

export function formatSearchResults(items: RegistryIndexItem[], options: SearchOptions) {
	const limit = options.limit === 0 ? items.length : options.limit;
	const offset = options.offset;
	const paginatedItems = items.slice(offset, offset + limit);
	const hasMore = offset + limit < items.length;

	let header = `Found ${items.length} item${items.length === 1 ? "" : "s"}`;
	if (options.query) {
		header += ` matching "${options.query}"`;
	}
	header += ` in ${options.registryUrl}:`;

	const body = paginatedItems
		.map((item) => {
			const parts = [`- ${item.name}`, `(${item.type})`];
			if (item.title) parts.push(`- ${item.title}`);
			if (item.description) parts.push(`- ${item.description}`);
			parts.push(`\n  Add command: \`${formatAddCommand([item.name])}\``);
			return parts.join(" ");
		})
		.join("\n\n");

	const range =
		paginatedItems.length > 0
			? `Showing items ${offset + 1}-${Math.min(offset + limit, items.length)} of ${items.length}.`
			: "No items to show for this page.";

	return `${header}\n\n${range}\n\n${body}${hasMore ? `\n\nMore items available. Use offset ${offset + limit} for the next page.` : ""}`;
}

export function formatRegistryItems(items: RegistryItem[]) {
	return items
		.map((item) => {
			const parts = [
				`## ${item.name}`,
				item.description ? `\n${item.description}` : "",
				`**Type:** ${item.type}`,
				item.dependencies?.length
					? `**Dependencies:** ${item.dependencies.join(", ")}`
					: "",
				item.devDependencies?.length
					? `**Dev Dependencies:** ${item.devDependencies.join(", ")}`
					: "",
				item.registryDependencies?.length
					? `**Registry Dependencies:** ${item.registryDependencies.join(", ")}`
					: "",
				item.files?.length ? formatFiles(item.files) : "",
			];

			return parts.filter(Boolean).join("\n");
		})
		.join("\n\n---\n\n");
}

export function formatExamples(items: RegistryItem[], query: string) {
	if (items.length === 0) {
		return `No examples found matching "${query}".`;
	}

	return `# Usage Examples

Found ${items.length} example${items.length === 1 ? "" : "s"} matching "${query}":

${items
	.map((item) => {
		const parts = [`## Example: ${item.name}`, item.description ? `\n${item.description}` : ""];
		if (item.files?.length) {
			parts.push(formatFiles(item.files));
		}
		return parts.filter(Boolean).join("\n");
	})
	.join("\n\n---\n\n")}`;
}

export function formatAddCommand(items: string[]) {
	return `npx shadcn-svelte@latest add ${items.join(" ")}`;
}

export function findUnknownTypesMessage(types?: string[]) {
	if (!types?.length) return null;

	const unknown = types.filter((type) => {
		const normalized = normalizeType(type);
		return !SEARCHABLE_TYPES.includes(normalized as SearchableType);
	});

	if (unknown.length === 0) return null;

	return `Unknown type${unknown.length === 1 ? "" : "s"}: ${unknown.join(
		", "
	)}. Valid types: ${SEARCHABLE_TYPES.map((type) => type.replace("registry:", "")).join(", ")}.`;
}

function formatFiles(files: NonNullable<RegistryItem["files"]>) {
	return files
		.map((file) => {
			const lang = file.target.endsWith(".svelte")
				? "svelte"
				: file.target.endsWith(".ts")
					? "ts"
					: file.target.endsWith(".js")
						? "js"
						: "";

			return `### Code (${file.target})

\`\`\`${lang}
${file.content}
\`\`\``;
		})
		.join("\n\n");
}

function normalizeType(type: string) {
	return type.startsWith("registry:") ? type : `registry:${type}`;
}
