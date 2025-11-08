import * as acorn from "acorn";
import * as svelte from "svelte/compiler";
import { walk, type Node } from "estree-walker";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import type { PackageJson } from "type-fest";
import { toArray } from "../../utils/utils.js";
import { getProjectPackageInfo, getDependencyPackageInfo } from "../../utils/get-package-info.js";

export type ResolvedDependencies = {
	/** `<Dep@Version, Peers[]>` */
	deps: Record<string, string[]>;
	/** `<Dep, Dep@Version>` */
	versions: Record<string, string>;
};

export type ProjectDependencies = {
	dependencies: ResolvedDependencies;
	devDependencies: ResolvedDependencies;
};

const tsParser = acorn.Parser.extend(tsPlugin());

export function resolveProjectDeps(cwd: string): ProjectDependencies {
	const pkg = getProjectPackageInfo(cwd);

	// Record<Dependency, [...PeerDependencies]>
	const dependencies = resolvePeerDeps(pkg.dependencies, cwd);
	const devDependencies = resolvePeerDeps(pkg.devDependencies, cwd);

	let projectDeps = resolveTypeDeps({ dependencies, devDependencies });
	projectDeps = resolvePeerVersions(projectDeps);

	return projectDeps;
}

/**
 * Adds a dependency's type definition package to their respective peer list (if applicable).
 */
export function resolveTypeDeps(projectDeps: ProjectDependencies) {
	for (const dependencies of Object.values(projectDeps)) {
		for (const [name, versioned] of Object.entries(dependencies.versions)) {
			const peers = dependencies.deps[versioned]!;
			// transforms orgs into the proper types package name (e.g. `@org/pkg-name` => `@types/org__pkg-name`)
			const typesName = `@types/${name.replace(/^@(.*)\/(.*)/, "$1__$2")}`;
			const typesVersion =
				projectDeps.dependencies.versions[typesName] ??
				projectDeps.devDependencies.versions[typesName];

			// if the types package exists, we'll add it to the peers
			if (typesVersion) {
				peers.push(typesName);
			}
		}
	}

	return projectDeps;
}

/**
 * Applies version tags to the peer dependencies in their respective lists.
 *
 * `dependencies.deps` goes from `<DepName@Version, PeerName[]>` to `<DepName@Version, PeerName@Version[]>`
 */
export function resolvePeerVersions(projectDeps: ProjectDependencies): ProjectDependencies {
	for (const dependencies of Object.values(projectDeps)) {
		for (const [name, peers] of Object.entries(dependencies.deps)) {
			dependencies.deps[name] = peers
				.map(
					(peer) =>
						projectDeps.dependencies.versions[peer] ||
						projectDeps.devDependencies.versions[peer]
				)
				.filter((peer) => peer !== undefined);
		}
	}

	return projectDeps;
}

export const IGNORE_DEPS = ["svelte", "@sveltejs/kit", "tailwindcss", "vite"];

/**
 * Resolves peer dependencies from a given set of dependencies from a package.json.
 *
 * Optional peer dependencies are ignored.
 */
function resolvePeerDeps(
	dependencies: PackageJson["dependencies"],
	cwd: string
): ResolvedDependencies {
	const deps: ResolvedDependencies["deps"] = {};
	const versions: ResolvedDependencies["versions"] = {};

	for (const [name, version] of Object.entries(dependencies ?? {})) {
		const versioned = version ? `${name}@${version}` : name;
		const peers = (deps[versioned] ??= []);

		versions[name] = versioned;

		const pkg = getDependencyPackageInfo(cwd, name)?.pkg;
		if (!pkg) continue;

		const { peerDependencies = {}, peerDependenciesMeta = {} } = pkg;
		for (const [peerName] of Object.entries(peerDependencies)) {
			// ignores certain peer deps and optional peer deps
			if (IGNORE_DEPS.includes(peerName) || peerDependenciesMeta[peerName]?.optional)
				continue;
			peers.push(peerName);
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
		ast = tsParser.parse(source, {
			ecmaVersion: "latest",
			sourceType: "module",
			sourceFile: filename,
		});
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
export function resolveDepsFromImport(source: string, dependencies: ResolvedDependencies) {
	const depsFound: string[] = [];
	const simple = dependencies.versions[source] ? source : undefined;
	const depName =
		simple ??
		// considers deep imports
		Object.keys(dependencies.versions).find((dep) => source.startsWith(dep));

	if (depName && !IGNORE_DEPS.includes(depName)) {
		const versioned = dependencies.versions[depName]!;
		const peers = dependencies.deps[versioned];
		depsFound.push(versioned);
		peers?.forEach((dep) => depsFound.push(dep));
	}

	return depsFound;
}
