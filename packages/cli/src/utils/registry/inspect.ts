import { z } from "zod";
import { fetchRegistryItems, getRegistryUrl, resolveRegistryItems } from "./index.js";
import { resolveGitHubRegistrySource } from "./address.js";
import { buildRegistryRequest } from "./builder.js";
import { getRegistryConfig } from "./config.js";
import { fetchRegistry } from "./fetcher.js";
import { fetchGitHubRegistryCatalog } from "./github.js";
import { registryItemCommonSchema } from "./schema.js";
import { DEFAULT_CONFIG } from "../config/schema.js";
import { loadEnvFiles } from "../env-loader.js";
import { error } from "../errors.js";
import { isUrl } from "../utils.js";

const catalogSchema = z.object({
	items: z.array(
		registryItemCommonSchema.pick({ name: true, title: true, type: true, description: true })
	),
});
export const catalogItemTypeSchema = registryItemCommonSchema.shape.type;

export async function viewRegistryItems(items: string[], cwd: string) {
	const config = getRegistryConfig(cwd);
	const registryUrl = getRegistryUrl({
		registry: config.registry ?? DEFAULT_CONFIG.registry,
		style: config.style,
	});
	const resolved = await resolveRegistryItems({
		items,
		cwd,
		registryUrl,
		includeDependencies: false,
	});
	return await Promise.all(
		resolved.map(
			async (item) => (await fetchRegistryItems({ baseUrl: registryUrl, items: [item] }))[0]!
		)
	);
}

export async function searchRegistryCatalogs(
	sources: string[],
	options: { cwd: string; query?: string; types?: string[]; limit: number; offset: number }
) {
	const config = getRegistryConfig(options.cwd);
	const env = Object.keys(config.registries).length ? loadEnvFiles(options.cwd) : process.env;
	const registries = [...new Set(sources.length ? sources : Object.keys(config.registries))];
	if (!registries.length)
		throw error("Specify a registry or configure one in components.json or package.json.");

	const results: Array<PromiseSettledResult<z.infer<typeof catalogSchema>["items"]>> = [];
	for (let start = 0; start < registries.length; start += 5) {
		results.push(
			...(await Promise.allSettled(
				registries.slice(start, start + 5).map(async (source) => {
					const github = resolveGitHubRegistrySource(source);
					if (github) return catalogSchema.parse(await fetchGitHubRegistryCatalog(github)).items;
					if (isUrl(source)) return catalogSchema.parse((await fetchRegistry([source]))[0]).items;
					const request = buildRegistryRequest(`${source}/registry`, config, env);
					if (!request)
						throw error("Use a namespace, a GitHub repository, or a registry catalog URL.");
					request.label = source;
					const parsed = catalogSchema.safeParse((await fetchRegistry([request]))[0]);
					if (!parsed.success) throw error("The registry did not return a valid catalog.");
					return parsed.data.items;
				})
			))
		);
	}

	const errors: { registry: string; message: string }[] = [];
	const query = options.query?.toLowerCase();
	const items = results.flatMap((result, index) => {
		const registry = registries[index]!;
		if (result.status === "rejected") {
			errors.push({
				registry,
				message:
					result.reason instanceof Error ? result.reason.message : "Could not read registry.",
			});
			return [];
		}
		return result.value
			.filter((item) => !options.types?.length || options.types.includes(item.type))
			.filter(
				(item) =>
					!query ||
					[item.name, item.title, item.description].some((field) =>
						field?.toLowerCase().includes(query)
					)
			)
			.map((item) => ({ ...item, registry }));
	});
	return {
		allFailed: errors.length === registries.length,
		items: items.slice(options.offset, options.offset + options.limit),
		pagination: {
			total: items.length,
			limit: options.limit,
			offset: options.offset,
			hasMore: options.offset + options.limit < items.length,
		},
		...(errors.length ? { errors } : {}),
	};
}
