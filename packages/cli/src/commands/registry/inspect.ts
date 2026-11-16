import { Command, InvalidArgumentError } from "commander";
import { handleError } from "../../utils/prompt-helpers.js";
import {
	catalogItemTypeSchema,
	searchRegistryCatalogs,
	viewRegistryItems,
} from "../../utils/registry/inspect.js";

function nonNegativeInteger(value: string) {
	const integer = Number(value);
	if (!/^\d+$/.test(value) || !Number.isSafeInteger(integer)) {
		throw new InvalidArgumentError("Expected a non-negative integer.");
	}
	return integer;
}

export const search = new Command("search")
	.alias("list")
	.description("search configured or explicitly specified registries")
	.argument("[registries...]", "registry namespaces, GitHub repositories, or catalog URLs")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.option("-q, --query <query>", "filter by name, title, or description")
	.option("-t, --type <types>", "comma-separated registry item types")
	.option("-l, --limit <number>", "maximum results", nonNegativeInteger, 100)
	.option("-o, --offset <number>", "number of results to skip", nonNegativeInteger, 0)
	.action(async (registries: string[], options) => {
		try {
			const types = (options.type as string | undefined)?.split(",").map((value) => {
				const type = value.trim().toLowerCase();
				return catalogItemTypeSchema.parse(
					type.startsWith("registry:") ? type : `registry:${type}`
				);
			});
			const { allFailed, ...result } = await searchRegistryCatalogs(registries, {
				...options,
				types,
			});
			console.log(JSON.stringify(result, null, 2));
			if (allFailed) process.exitCode = 1;
		} catch (error) {
			handleError(error);
		}
	});

export const view = new Command("view")
	.description("view registry item payloads without installing them")
	.argument(
		"<items...>",
		"item names, namespaced items, GitHub item addresses, JSON files, or URLs"
	)
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.action(async (items: string[], { cwd }) => {
		try {
			console.log(JSON.stringify(await viewRegistryItems(items, cwd), null, 2));
		} catch (error) {
			handleError(error);
		}
	});
