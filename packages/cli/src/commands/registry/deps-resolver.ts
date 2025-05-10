import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import * as acorn from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk, type Node } from "estree-walker";
import * as svelte from "svelte/compiler";
import type { PackageJson } from "type-fest";
import { loadProjectPackageInfo } from "../../utils/get-package-info.js";

// will be removed once moving from `next` to `latest`
const TMP_NEXT_DEPS = ["paneforge", "vaul-svelte"];

const ICON_DEPENDENCIES = ["@lucide/svelte"];

const tsParser = acorn.Parser.extend(tsPlugin());

export async function resolveProjectDeps(cwd: string) {
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
		const peers = (deps[versioned] ??= []);

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
			peers.push(peerVersioned);
			// TODO: maybe do this recursively or nah?
		}
	}
	return { deps, versionMap };
}

type GetFileDepOpts = {
	filename: string;
	source: string;
	dependencies: ReturnType<typeof resolvePeerDeps>;
	devDependencies: ReturnType<typeof resolvePeerDeps>;
};
export async function getFileDependencies(opts: GetFileDepOpts) {
	const { filename, source } = opts;
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

	const dependencies = new Set<string>();
	const devDependencies = new Set<string>();

	const enter = (node: Node) => {
		if (node.type !== "ImportDeclaration") return;
		const source = node.source.value as string;

		// TODO: consider deep imports

		// TODO: consider peer deps with arbitrary version ranges

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
