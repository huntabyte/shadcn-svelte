import path from "node:path";
import { parse as parseCss } from "postcss";
import { buildRegistryRequest } from "./builder.js";
import { fetchRegistry, type RegistryRequest } from "./fetcher.js";
import * as schemas from "../../schema/index.js";
import { OFFICIAL_REGISTRY_URL } from "../../constants.js";
import { BASE_COLORS, type ResolvedConfig } from "../config/index.js";
import { loadEnvFiles } from "../env-loader.js";
import { CLIError, error } from "../errors.js";
import { isUrl, resolveURL } from "../utils.js";

export function getRegistryUrl(config: { registry: string; style?: string }) {
	// so old URL's will still work
	if (process.env.COMPONENTS_REGISTRY_URL) {
		return process.env.COMPONENTS_REGISTRY_URL;
	}
	const url = process.env.REGISTRY_URL ?? config.registry;

	return new URL(url + `/styles/${config.style ?? "vega"}`).toString();
}

export function getSiteUrl(config: { registry: string }) {
	const registryUrl = getRegistryUrl(config);
	return new URL(registryUrl).origin;
}

export async function getRegistryIndex(registryUrl: string) {
	try {
		const url = resolveURL(registryUrl, "index.json");
		const [result] = await fetchRegistry([url]);
		return schemas.registryIndexSchema.parse(result);
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch components from registry.`, e);
	}
}

export function getBaseColors() {
	return BASE_COLORS.map((color) => ({
		name: color,
		label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
	}));
}

export async function getRegistryTheme(baseUrl: string, theme: string) {
	try {
		const url = resolveURL(baseUrl, `colors/${theme}.json`);
		const [result] = await fetchRegistry([url]);

		return schemas.registryBaseColorSchema.parse(result);
	} catch (e) {
		throw error(`Failed to fetch theme: ${theme} from registry.`, e);
	}
}

/** Last `cn-*` ident in a selector (dotted or nested/undotted). */
function subjectCnClass(selector: string): string | undefined {
	const matches = [...selector.matchAll(/(?:^|[\s.>+~])(cn-[\w-]+)/g)];
	return matches.at(-1)?.[1];
}

/** Parses a style CSS file and extracts the `@apply` styles for each class */
export function parseStyleCss(css: string): Record<string, string> {
	const ast = parseCss(css);
	const styles: Record<string, string> = {};

	ast.walkRules((rule) => {
		for (const selector of rule.selectors) {
			const className = subjectCnClass(selector.trim());
			if (!className) continue;

			const applyValues: string[] = [];
			rule.walkAtRules("apply", (atRule) => {
				const applyValue = atRule.params.trim();
				if (applyValue) applyValues.push(applyValue);
			});

			if (applyValues.length === 0) continue;

			const next = applyValues.join(" ");
			styles[className] = styles[className] ? `${next} ${styles[className]}` : next;
		}
	});

	return styles;
}

type ResolveRegistryItemsProps = {
	registryUrl: string;
	registryIndex?: schemas.RegistryIndex;
	items: string[];
	parentUrl?: URL;
	config?: ResolvedConfig;
};

type ResolvedRegistryItem = schemas.RegistryItem | schemas.RegistryIndexItem;
export async function resolveRegistryItems({
	registryUrl,
	registryIndex,
	items,
	parentUrl,
	config,
}: ResolveRegistryItemsProps): Promise<ResolvedRegistryItem[]> {
	const resolvedItems: ResolvedRegistryItem[] = [];
	const visited = new Set<string>();
	const env = config?.registries ? loadEnvFiles(config.resolvedPaths.cwd) : process.env;

	async function resolveItems(items: string[], parent?: URL | RegistryRequest) {
		for (const item of items) {
			let request: URL | RegistryRequest | undefined = buildRegistryRequest(item, config, env);
			let resolvedItem: ResolvedRegistryItem | undefined;
			const parentUrl = parent instanceof URL ? parent : parent?.url;
			const isRelative = item.startsWith("./") || item.startsWith("../");

			if (!request && (isUrl(item) || (parentUrl && isRelative))) {
				const url = new URL(item, parentUrl);
				// Only relative dependencies inherit the credentials of their parent registry.
				request =
					isRelative && parent && !(parent instanceof URL)
						? {
								url,
								headers: url.origin === parent.url.origin ? parent.headers : {},
								label: `${parent.label} dependency`,
							}
						: url;
			}

			if (!request) {
				registryIndex ??= await getRegistryIndex(registryUrl);
				resolvedItem = registryIndex.find((entry) => entry.name === item);
				if (!resolvedItem) {
					if (parentUrl) {
						throw error(
							`Registry item '${item}' does not exist in the remote registry at '${parentUrl.origin}', nor is it a valid URL or relative path.`
						);
					}

					let message = `Registry item '${item}' does not exist in the registry at '${registryUrl}'.`;
					if (registryUrl !== OFFICIAL_REGISTRY_URL) {
						message += `\n\nIf you're trying to use shadcn-svelte components, ensure your 'registry' property in components.json is set to '${OFFICIAL_REGISTRY_URL}'.`;
					}
					throw error(message);
				}
			}

			const url = request instanceof URL ? request : request?.url;
			const headers = request && !(request instanceof URL) ? request.headers : {};
			const key = JSON.stringify([
				url?.href ??
					resolveURL(registryUrl, (resolvedItem as schemas.RegistryIndexItem).relativeUrl).href,
				Object.entries(headers).sort(([a], [b]) => a.localeCompare(b)),
			]);
			// Track the source, not the item's name: two registries may both publish "button".
			if (visited.has(key)) continue;
			visited.add(key);

			if (request) {
				const [result] = await fetchRegistry([request]);
				try {
					resolvedItem = schemas.registryItemSchema.parse(result);
				} catch (e) {
					if (!(request instanceof URL))
						throw error(`Invalid registry item received for ${request.label}.`);
					throw e;
				}
			}

			resolvedItems.push(resolvedItem!);
			if (resolvedItem!.registryDependencies?.length) {
				await resolveItems(resolvedItem!.registryDependencies, request);
			}
		}
	}

	await resolveItems(items, parentUrl);
	return resolvedItems;
}

type FetchTreeProps = { baseUrl: string; items: ResolvedRegistryItem[] };
export async function fetchRegistryItems({
	baseUrl,
	items,
}: FetchTreeProps): Promise<schemas.RegistryItem[]> {
	const itemsWithContent = items.filter((item) => !("relativeUrl" in item));
	const itemsToFetch = items.filter((item) => "relativeUrl" in item);

	try {
		const itemUrls = itemsToFetch.map((item) => resolveURL(baseUrl, item.relativeUrl));
		const result = (await fetchRegistry(itemUrls)).concat(itemsWithContent);

		return schemas.registryItemSchema.array().parse(result);
	} catch (e) {
		if (e instanceof CLIError) throw e;
		throw error(`Failed to fetch tree from registry.`, e);
	}
}

export function getItemAliasDir(config: ResolvedConfig, type: schemas.RegistryItemType) {
	if (type === "registry:ui") return config.resolvedPaths.ui;
	if (type === "registry:lib") return config.resolvedPaths.lib;
	if (type === "registry:hook") return config.resolvedPaths.hooks;
	if (type === "registry:file") return config.resolvedPaths.cwd;
	if (type === "registry:font") return config.resolvedPaths.cwd;
	if (type === "registry:base") return config.resolvedPaths.cwd;

	if (type === "registry:style" || type === "registry:theme") {
		return path.basename(config.resolvedPaths.tailwindCss);
	}

	if (type === "registry:block" || type === "registry:component") {
		return config.resolvedPaths.components;
	}

	if (type === "registry:page") {
		if (config.sveltekit) return path.resolve(config.resolvedPaths.cwd, "src", "routes");

		// we'll fallback to components alias
		return config.resolvedPaths.components;
	}

	throw new Error(`TODO: unhandled item type ${type}`);
}

export function resolveItemFilePath(
	config: ResolvedConfig,
	item: schemas.RegistryItem,
	file: schemas.RegistryItemFile
): string {
	// resolves relative to the root (cwd)
	if (file.target.startsWith("~/")) {
		return path.resolve(config.resolvedPaths.cwd, file.target.replace("~/", ""));
	}

	if (item.name === "utils") {
		const utils = config.resolvedPaths.utils;
		if (utils.match(/.*\.(ts|js)$/)) return utils;
		else return `${utils}.ts`;
	}

	let aliasDir;
	if (file.type === "registry:file") {
		// resolves relative to the item-type's alias
		aliasDir = getItemAliasDir(config, item.type);
	} else {
		// resolves relative to the file-type's alias
		aliasDir = getItemAliasDir(config, file.type);
	}

	return path.resolve(aliasDir, file.target);
}
