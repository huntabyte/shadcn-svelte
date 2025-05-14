import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import * as acorn from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk, type Node } from "estree-walker";
import * as svelte from "svelte/compiler";
import type { PackageJson } from "type-fest";
import { loadProjectPackageInfo } from "../../utils/get-package-info.js";
import { toArray } from "../../utils/utils.js";

const tsParser = acorn.Parser.extend(tsPlugin());

export async function resolveProjectDeps(cwd: string) {
	const pkg = loadProjectPackageInfo(cwd);

	// Record<Dependency, [...PeerDependencies]>
	const dependencies = resolvePeerDeps(pkg.dependencies, cwd);
	const devDependencies = resolvePeerDeps(pkg.devDependencies, cwd);

	return { dependencies, devDependencies };
}

const IGNORE_DEPS = ["svelte", "@sveltejs/kit", "tailwindcss", "vite"];

export function resolvePeerDeps(dependencies: PackageJson["dependencies"], cwd: string) {
	const deps: Record<string, string[]> = {};
	/** `<Dep, Dep@Version>` */
	const versions: Record<string, string> = {};
	const require = createRequire(path.resolve(cwd, "noop.js"));
	for (const [name, version] of Object.entries(dependencies ?? {})) {
		let pkgPath: string | undefined;

		const versioned = version ? `${name}@${version}` : name;
		versions[name] = versioned;
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
		const { peerDependencies = {}, peerDependenciesMeta = {} }: PackageJson = JSON.parse(json);

		for (const [peerName, peerVersion] of Object.entries(peerDependencies)) {
			// ignores certain peer deps and optional peer deps
			if (IGNORE_DEPS.includes(peerName) || peerDependenciesMeta[peerName]?.optional)
				continue;
			const peerVersioned = peerVersion ? `${peerName}@${peerVersion}` : peerName;
			peers.push(peerVersioned);
		}
	}
	return { deps, versions };
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

		const deps = resolveDepsFromImport(source, opts.dependencies);
		deps.forEach((dep) => dependencies.add(dep));

		const devDeps = resolveDepsFromImport(source, opts.devDependencies);
		devDeps.forEach((dep) => devDependencies.add(dep));
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

/** Returns an array of found deps. */
function resolveDepsFromImport(source: string, projectDeps: ReturnType<typeof resolvePeerDeps>) {
	const depsFound: string[] = [];
	const simple = projectDeps.versions[source] ? source : undefined;
	const depName =
		simple ??
		// considers deep imports
		Object.keys(projectDeps.versions).find((dep) => source.startsWith(dep));

	if (depName && !IGNORE_DEPS.includes(depName)) {
		const versioned = projectDeps.versions[depName]!;
		const peers = projectDeps.deps[versioned];
		depsFound.push(versioned);
		peers?.forEach((dep) => depsFound.push(dep));
	}

	return depsFound;
}
