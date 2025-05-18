import { describe, it, expect, beforeEach, vi } from "vitest";
import {
	resolveDepsFromImport,
	IGNORE_DEPS,
	resolvePeerVersions,
	resolveTypeDeps,
	getFileDependencies,
	type ResolvedDependencies,
	type ProjectDependencies,
} from "../../src/commands/registry/deps-resolver.js";

vi.mock("node:fs");

describe("resolveDepsFromImport", () => {
	const mockDeps: ResolvedDependencies = {
		versions: {
			foo: "foo@1.2.3",
			bar: "bar@4.5.6",
			baz: "baz@7.8.9",
			// intentionally include an ignored dep
			svelte: "svelte@3.0.0",
		},
		deps: {
			"foo@1.2.3": ["peer-a", "peer-b"],
			"bar@4.5.6": [],
			// baz with no entry to test undefined peers
		},
	};
	it("returns version + peers for a simple import", () => {
		const result = resolveDepsFromImport("foo", mockDeps);
		expect(result).toEqual(["foo@1.2.3", "peer-a", "peer-b"]);
	});

	it("returns only version if there are no peers", () => {
		const result = resolveDepsFromImport("bar", mockDeps);
		expect(result).toEqual(["bar@4.5.6"]);
	});

	it("returns only version when deps[version] is undefined", () => {
		const result = resolveDepsFromImport("baz", mockDeps);
		expect(result).toEqual(["baz@7.8.9"]);
	});

	it("detects deep imports by prefix", () => {
		const result = resolveDepsFromImport("foo/utils", mockDeps);
		expect(result).toEqual(["foo@1.2.3", "peer-a", "peer-b"]);
	});

	it("ignores deps listed in IGNORE_DEPS even if present", () => {
		for (const dep of IGNORE_DEPS) {
			const src = dep;
			// force a matching version
			mockDeps.versions[dep] = `${dep}@0.0.1`;
			const result = resolveDepsFromImport(src, mockDeps);
			expect(result).toEqual([]);
		}
	});

	it("returns empty array when no matching dep found", () => {
		const result = resolveDepsFromImport("unknown-package", mockDeps);
		expect(result).toEqual([]);
	});
});

describe("resolvePeerVersions", () => {
	let projectDeps: ProjectDependencies;

	beforeEach(() => {
		projectDeps = {
			dependencies: {
				versions: {
					foo: "foo@1.0.0",
					shared: "shared@1.1.0",
				},
				deps: {
					"foo@1.0.0": ["bar", "shared", "missing"],
				},
			},
			devDependencies: {
				versions: {
					bar: "bar@2.0.0",
					// shared also exists here but dependencies should take precedence
					shared: "shared@2.2.0",
					extra: "extra@3.0.0",
				},
				deps: {
					"extra@3.0.0": ["foo", "unknown"],
				},
			},
		};
	});
	it("replaces dependency peers with their version strings from dependencies and devDependencies", () => {
		const result = resolvePeerVersions(projectDeps);
		expect(result.dependencies.deps["foo@1.0.0"]).toEqual(["bar@2.0.0", "shared@1.1.0"]);
	});

	it("filters out peers not found in either versions map", () => {
		const deps = resolvePeerVersions(projectDeps).dependencies.deps["foo@1.0.0"];
		expect(deps).not.toContain("missing");
		expect(deps).toHaveLength(2);
	});

	it("uses devDependencies when dependency versions are missing", () => {
		// 'bar' only exists in devDependencies
		const deps = resolvePeerVersions(projectDeps).dependencies.deps["foo@1.0.0"];
		expect(deps).toContain("bar@2.0.0");
	});

	it("gives precedence to dependencies.versions over devDependencies.versions when both define a peer", () => {
		// 'shared' exists in both; should pick dependencies.shared@1.1.0
		const deps = resolvePeerVersions(projectDeps).dependencies.deps["foo@1.0.0"];
		expect(deps).toContain("shared@1.1.0");
		expect(deps).not.toContain("shared@2.2.0");
	});

	it("also resolves peers for devDependencies.deps", () => {
		const devPeers = resolvePeerVersions(projectDeps).devDependencies.deps["extra@3.0.0"];
		expect(devPeers).toEqual(["foo@1.0.0"]);
	});

	it("leaves empty peer arrays unchanged", () => {
		projectDeps.dependencies.deps["empty@0.0.1"] = [];
		const result = resolvePeerVersions(projectDeps);
		expect(result.dependencies.deps["empty@0.0.1"]).toEqual([]);
	});

	it("returns the same object reference (mutates in place)", () => {
		const before = projectDeps;
		const after = resolvePeerVersions(projectDeps);
		expect(after).toBe(before);
	});
});

describe("resolveTypeDeps", () => {
	let projectDeps: ProjectDependencies;

	beforeEach(() => {
		projectDeps = {
			dependencies: {
				versions: {
					// normal package
					foo: "foo@1.0.0",
					// scoped package
					"@org/pkg": "@org/pkg@2.3.4",
					// its types package in dependencies
					"@types/foo": "@types/foo@1.0.0",
				},
				deps: {
					"foo@1.0.0": ["peer-x"],
					"@org/pkg@2.3.4": [],
				},
			},
			devDependencies: {
				versions: {
					"@types/org__pkg": "@types/org__pkg@2.3.4",
				},
				deps: {
					"unused@0.0.1": ["foo"],
				},
			},
		};
	});
	it("adds a non-scoped package types name when found in dependencies", () => {
		resolveTypeDeps(projectDeps);
		const peers = projectDeps.dependencies.deps["foo@1.0.0"];
		expect(peers).toContain("@types/foo");
	});

	it("adds a scoped package types name when found in devDependencies", () => {
		resolveTypeDeps(projectDeps);
		const peers = projectDeps.dependencies.deps["@org/pkg@2.3.4"];
		// types name for @org/pkg is '@types/org__pkg'
		expect(peers).toContain("@types/org__pkg");
	});

	it("does not add a types name if no types version exists", () => {
		// remove both entries
		delete projectDeps.dependencies.versions["@types/foo"];
		delete projectDeps.devDependencies.versions["@types/foo"];
		projectDeps.dependencies.deps["foo@1.0.0"] = [];
		resolveTypeDeps(projectDeps);
		expect(projectDeps.dependencies.deps["foo@1.0.0"]).toEqual([]);
	});

	it("mutates peers in place and returns the same object", () => {
		const before = projectDeps;
		const after = resolveTypeDeps(projectDeps);
		expect(after).toBe(before);
	});

	it("only pushes the package name, not the version string", () => {
		resolveTypeDeps(projectDeps);
		const peers = projectDeps.dependencies.deps["foo@1.0.0"];
		expect(peers.includes("@types/foo@1.0.0")).toBe(false);
	});
});

function mkResolved(input: Record<string, string[]>): ResolvedDependencies {
	// input: map from package name -> list of its peer deps (by package name)
	const versions: Record<string, string> = {};
	const deps: Record<string, string[]> = {};

	for (const [name, peers] of Object.entries(input)) {
		const versioned = `${name}@1.0.0`;
		versions[name] = versioned;
		// peers should themselves be versioned
		deps[versioned] = peers.map((p) => `${p}@1.0.0`);
	}

	return { versions, deps };
}

function mkOpts(
	filename: string,
	source: string,
	depsMap: Record<string, string[]>,
	devDepsMap: Record<string, string[]>
) {
	return {
		filename,
		source,
		dependencies: mkResolved(depsMap),
		devDependencies: mkResolved(devDepsMap),
	} as const;
}

describe("getFileDependencies", () => {
	it("returns {} for unknown extensions", async () => {
		const result = await getFileDependencies(mkOpts("config.env", "FOO=bar", {}, {}));
		expect(result).toEqual({});
	});

	it("extracts versioned imports from a .js file", async () => {
		const src = `
		import fs from 'fs';
		import { join } from 'path';
	  `;
		const result = await getFileDependencies(mkOpts("index.js", src, { fs: [], path: [] }, {}));

		expect(result).toEqual({
			dependencies: ["fs@1.0.0", "path@1.0.0"],
			devDependencies: undefined,
		});
	});

	it("extracts versioned imports + peers from a .ts file in import order", async () => {
		const src = `
		import type { Foo } from 'foo';
		import Bar from 'bar';
	  `;
		const result = await getFileDependencies(
			mkOpts("index.ts", src, { foo: [], bar: ["bar-peer"] }, {})
		);

		// foo import -> foo@1.0.0
		// bar import -> bar@1.0.0 then its peer bar-peer@1.0.0
		expect(result.dependencies).toEqual(["foo@1.0.0", "bar@1.0.0", "bar-peer@1.0.0"]);
		expect(result.devDependencies).toBeUndefined();
	});

	it('parses <script> and <script context="module"> in .svelte', async () => {
		const svelteSrc = `
		<script>
		  import A from 'a';
		</script>
		<script context="module">
		  import B from 'b';
		</script>
		<div>{A}{B}</div>
	  `;
		const result = await getFileDependencies(
			mkOpts("Component.svelte", svelteSrc, { a: [], b: [] }, { b: ["b-dev"] })
		);

		// instance script: a@1.0.0
		// module script: b@1.0.0 then its peer b-dev@1.0.0 in devDependencies
		expect(result.dependencies).toEqual(["a@1.0.0", "b@1.0.0"]);
		expect(result.devDependencies).toEqual(["b@1.0.0", "b-dev@1.0.0"]);
	});
});
