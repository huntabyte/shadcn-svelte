import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import * as acorn from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk, type Node } from "estree-walker";
import * as svelte from "svelte/compiler";
import type { PackageJson } from "type-fest";
import { loadProjectPackageInfo } from "../../utils/get-package-info.js";
import { getTSConfig, type Config } from "../../utils/get-config.js";
import { resolveImport } from "../../utils/resolve-imports.js";
import type { Registry, RegistryIndex } from "@shadcn-svelte/registry";
import { resolveURL } from "../../utils/utils.js";

// will be removed once moving from `next` to `latest`
export const TMP_NEXT_DEPS = ["paneforge", "vaul-svelte"];

const ICON_DEPENDENCIES = ["@lucide/svelte"];

const tsParser = acorn.Parser.extend(tsPlugin());

export async function resolveProjectDeps(config: Config) {
	const cwd = config.resolvedPaths.cwd;
	const pkg = loadProjectPackageInfo(cwd);

	// Record<Dependency, [...PeerDependencies]>
	const dependencies = resolvePeerDeps(pkg.dependencies, cwd);
	const devDependencies = resolvePeerDeps(pkg.devDependencies, cwd);

	return { dependencies, devDependencies };
}

function resolvePeerDeps(dependencies: PackageJson["dependencies"], cwd: string) {
	const deps: Record<string, string[]> = {};
	const versionMap: Record<string, string> = {};
	const require = createRequire(path.resolve(cwd, "noop.js"));
	for (const [name, version] of Object.entries(dependencies ?? {})) {
		let pkgPath: string | undefined;

		const versioned = version ? `${name}@${version}` : name;
		versionMap[name] = versioned;
		const dep = (deps[versioned] ??= []);

		const paths = require.resolve.paths(name);
		if (!paths) continue;

		for (const nodeModulesPath of paths) {
			const check = path.join(nodeModulesPath, name, "package.json");
			if (fs.existsSync(check)) {
				pkgPath = check;
				break;
			}
		}
		if (!pkgPath) continue;

		const json = fs.readFileSync(pkgPath, "utf8");
		const { peerDependencies = {} }: PackageJson = JSON.parse(json);

		for (const [peerName, peerVersion] of Object.entries(peerDependencies)) {
			// ignore `svelte` as a peerDep
			if (peerName === "svelte") continue;
			const peerVersioned = peerVersion ? `${peerName}@${peerVersion}` : peerName;
			dep.push(peerVersioned);
			// TODO: maybe do this recursively or nah?
		}
	}
	return { deps, versionMap };
}

type GetFileDepOpts = {
	config: Config;
	filename: string;
	source: string;
	output: string;
	dependencies: ReturnType<typeof resolvePeerDeps>;
	devDependencies: ReturnType<typeof resolvePeerDeps>;
	registryDependencies?: string[];
	registry: Registry;
	registryIndex: RegistryIndex;
};
export async function getFileDependencies(opts: GetFileDepOpts) {
	const { filename, source, config } = opts;
	let ast: unknown;
	let moduleAst: unknown;

	if (filename.endsWith(".svelte")) {
		const { code } = await svelte.preprocess(source, [], { filename });
		const result = svelte.parse(code, { filename });
		ast = result.instance;
		if (result.module) {
			moduleAst = result.module;
		}
	} else if (filename.endsWith(".ts") || filename.endsWith(".js")) {
		ast = tsParser.parse(source, { ecmaVersion: "latest", sourceType: "module" });
	} else {
		// unknown file (e.g. `.env` or some config file)
		return {};
	}

	const registryDependencies = new Set<string>();
	const dependencies = new Set<string>();
	const devDependencies = new Set<string>();

	const tsconfigType = config.typescript ? "tsconfig.json" : "jsconfig.json";
	const tsconfig = getTSConfig(config.resolvedPaths.cwd, tsconfigType)!;
	const enter = (node: Node) => {
		if (node.type !== "ImportDeclaration") return;
		const source = node.source.value as string;

		// TODO: consider deep imports

		const depVersioned = opts.dependencies.versionMap[source];
		if (depVersioned) {
			const depPeers = opts.dependencies.deps[depVersioned];
			dependencies.add(depVersioned);
			depPeers?.forEach((dep) => dependencies.add(dep));
		}

		const devDepVersioned = opts.devDependencies.versionMap[source];
		if (devDepVersioned) {
			const depPeers = opts.devDependencies.deps[devDepVersioned];
			devDependencies.add(devDepVersioned);
			depPeers?.forEach((dep) => devDependencies.add(dep));
		}

		// resolve the import path
		const resolvedPath = resolveImport(source, tsconfig);

		const aliases: Array<keyof Config["resolvedPaths"]> = ["ui", "hooks", "components", "lib"];

		if (resolvedPath && !resolvedPath.startsWith(config.resolvedPaths.utils)) {
			for (const alias of aliases) {
				const aliasPath = config.resolvedPaths[alias];
				if (resolvedPath.startsWith(aliasPath)) {
					const [filename] = resolvedPath
						.replace(aliasPath + path.sep, "")
						.split(path.sep);
					const itemName = stripExt(filename!);

					const customItem = opts.registry.items.find((item) => item.name === itemName);
					const registryItem = opts.registryIndex.find((item) => item.name === itemName);

					// super fucking hacky
					if (!opts.registry.homepage.includes("shadcn-svelte.com") && customItem) {
						// added as a url reference
						const [, registryPath] = opts.output
							.split(path.sep)
							.join("/")
							.split("static/");
						const url = resolveURL(
							opts.registry.homepage,
							registryPath! + "/" + `${itemName}.json`
						);
						registryDependencies.add(url.href);
					} else if (registryItem) {
						// gets added as-is (e.g. `button`, `calendar`, etc.)
						registryDependencies.add(itemName);
					} else {
						// TODO: throw an error if it doesn't exist in the `registry.json` and or the registry index
						throw "TODO: an unknown item";
					}
					break;
				}
			}
		}

		const iconDep = ICON_DEPENDENCIES.find((dep) => source.startsWith(dep));
		if (iconDep !== undefined) {
			dependencies.add(iconDep);
		}
	};

	// @ts-expect-error yea, stfu
	walk(ast, { enter });

	if (moduleAst) {
		// @ts-expect-error yea, stfu x2
		walk(moduleAst, { enter });
	}

	return {
		registryDependencies: toArray(registryDependencies),
		dependencies: toArray(dependencies),
		devDependencies: toArray(devDependencies),
	};
}

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}

function stripExt(name: string) {
	return name.replace(/(\.svelte)?\.(ts|js|svelte)/, "");
}
