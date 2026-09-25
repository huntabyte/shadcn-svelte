import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { extractClassStrings, pairClassStrings, type ClassString, type Pair } from "./compare.ts";

export type DocsParityOptions = {
	surface?: string;
	root?: string;
	upstream?: string;
	check?: boolean;
	refresh?: boolean;
	verbose?: boolean;
};

type Contract = {
	name: string;
	local: string;
	upstream: string;
	marker: string[];
	localMarker?: string[];
	allowedDifference?: { added: string[]; removed: string[] };
	occurrences?: number;
};

type Surface = { description: string; contracts: Contract[] };

export const DOCS_SURFACES: Record<string, Surface> = {
	"component-preview": {
		description: "component preview chrome and sizing",
		contracts: [
			{
				name: "container",
				local: "src/lib/components/component-preview-tabs.svelte",
				upstream: "apps/v4/components/component-preview-tabs.tsx",
				marker: ["group", "mt-4", "mb-12", "rounded-2xl"],
			},
			{
				name: "preview",
				local: "src/lib/components/component-preview-tabs.svelte",
				upstream: "apps/v4/components/component-preview-tabs.tsx",
				marker: ["preview", "h-72", "p-10", "data-[chromeless=true]:h-auto"],
				localMarker: ["preview", "min-h-72", "p-10"],
				// Let tall Svelte examples grow without losing the upstream preview chrome.
				allowedDifference: {
					added: ["min-h-72"],
					removed: ["h-72", "data-[chromeless=true]:h-auto"],
				},
			},
			{
				name: "view-code button",
				local: "src/lib/components/component-preview-tabs.svelte",
				upstream: "apps/v4/components/component-preview-tabs.tsx",
				marker: ["z-10", "rounded-lg", "shadow-none", "dark:hover:bg-muted"],
			},
		],
	},
	"docs-sidebar": {
		description: "docs sidebar height, rail, content, and navigation",
		contracts: [
			{
				name: "sidebar",
				local: "src/lib/components/docs-sidebar.svelte",
				upstream: "apps/v4/components/docs-sidebar.tsx",
				marker: ["sticky", "h-[calc(100svh-10rem)]", "[--sidebar-menu-width:--spacing(56)]"],
			},
			{
				name: "separator",
				local: "src/lib/components/docs-sidebar.svelte",
				upstream: "apps/v4/components/docs-sidebar.tsx",
				marker: [
					"top-12",
					"right-2",
					"w-px",
					"bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)]",
				],
			},
			{
				name: "content",
				local: "src/lib/components/docs-sidebar.svelte",
				upstream: "apps/v4/components/docs-sidebar.tsx",
				marker: ["w-(--sidebar-menu-width)", "scroll-fade", "pl-2.5"],
			},
			{
				name: "navigation item",
				local: "src/lib/components/docs-sidebar.svelte",
				upstream: "apps/v4/components/docs-sidebar.tsx",
				marker: ["h-[30px]", "text-[0.8rem]", "3xl:fixed:max-w-48"],
				occurrences: 2,
			},
		],
	},
	homepage: {
		description: "homepage shell and responsive preview",
		contracts: [
			...[
				["page", ["flex", "flex-1", "flex-col"]],
				["header", ["md:**:[.container]:pb-8", "lg:**:[.container]:pb-12"]],
				["content", ["container-wrapper", "flex-1", "p-0"]],
				["viewport", ["container", "overflow-hidden", "lg:max-w-none"]],
				["mobile preview", ["-mx-4", "w-[140vw]", "md:hidden"]],
				["desktop preview", ["hidden", "md:block"]],
			].map(([name, marker]) => ({
				name: name as string,
				local: "src/routes/(app)/(layout)/(root)/+page.svelte",
				upstream: "apps/v4/app/(app)/(root)/page.tsx",
				marker: marker as string[],
			})),
		],
	},
	attachment: {
		description: "attachment demo preview height",
		contracts: [
			{
				name: "preview override",
				local: "content/components/attachment.md",
				upstream: "apps/v4/content/docs/components/base/attachment.mdx",
				marker: ["h-auto", "theme-blue", "bg-surface", "dark:bg-background"],
				occurrences: 6,
			},
		],
	},
};

function findUpstreamRoot(explicit?: string): string | undefined {
	if (explicit) return path.resolve(explicit);
	if (process.env.SHADCN_UI) return path.resolve(process.env.SHADCN_UI);
	const sibling = path.resolve(import.meta.dirname, "../../../../shadcn-ui");
	return fs.existsSync(sibling) ? sibling : undefined;
}

function findContractClass(content: string, marker: string[]): ClassString | undefined {
	return extractClassStrings(content).find((entry) =>
		marker.every((token) => entry.tokens.includes(token))
	);
}

function occurrenceCount(content: string, entry: ClassString): number {
	let count = 0;
	let offset = 0;
	while ((offset = content.indexOf(entry.merged, offset)) !== -1) {
		count++;
		offset += entry.merged.length;
	}
	return count;
}

async function readUpstream(relativePath: string, root: string | undefined, refresh: boolean) {
	if (root) return fs.readFileSync(path.join(root, relativePath), "utf8");
	const cachePath = path.join(os.tmpdir(), "shadcn-svelte-upstream-docs", relativePath);
	if (!refresh && fs.existsSync(cachePath)) return fs.readFileSync(cachePath, "utf8");
	const url = `https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/${relativePath}`;
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`);
	const content = await response.text();
	fs.mkdirSync(path.dirname(cachePath), { recursive: true });
	fs.writeFileSync(cachePath, content);
	return content;
}

export async function compareDocsContract(
	contract: Contract,
	docsRoot: string,
	upstreamRoot: string | undefined,
	refresh = false
): Promise<{ pair?: Pair; error?: string }> {
	const localContent = fs.readFileSync(path.join(docsRoot, contract.local), "utf8");
	const upstreamContent = await readUpstream(contract.upstream, upstreamRoot, refresh);
	const expected = findContractClass(upstreamContent, contract.marker);
	if (!expected)
		return { error: `upstream class not found for markers: ${contract.marker.join(" ")}` };
	const localMarker = contract.localMarker ?? contract.marker;
	const actual = findContractClass(localContent, localMarker);
	if (!actual) return { error: `local class not found for markers: ${localMarker.join(" ")}` };
	if (contract.occurrences && occurrenceCount(localContent, actual) < contract.occurrences) {
		return {
			error: `expected ${contract.occurrences} occurrences, found ${occurrenceCount(localContent, actual)}`,
		};
	}
	const pair = pairClassStrings([actual], [expected])[0]!;
	if (
		pair.kind === "diff" &&
		contract.allowedDifference &&
		[...pair.added].sort().join(" ") === [...contract.allowedDifference.added].sort().join(" ") &&
		[...pair.removed].sort().join(" ") === [...contract.allowedDifference.removed].sort().join(" ")
	) {
		pair.kind = "ignored";
	}
	return { pair };
}

export async function runDocsParity(options: DocsParityOptions = {}) {
	const docsRoot = path.resolve(options.root ?? path.resolve(import.meta.dirname, "../../../docs"));
	const upstreamRoot = findUpstreamRoot(options.upstream);
	const selected = options.surface
		? { [options.surface]: DOCS_SURFACES[options.surface] }
		: DOCS_SURFACES;
	if (options.surface && !DOCS_SURFACES[options.surface]) {
		throw new Error(
			`Unknown docs surface: ${options.surface}. Choose ${Object.keys(DOCS_SURFACES).join(", ")}`
		);
	}

	console.log("Comparing docs UI class contracts to shadcn/ui");
	console.log(`Upstream: ${upstreamRoot ?? "shadcn-ui/ui main (cached raw files)"}`);
	let diffs = 0;
	let total = 0;
	for (const [surfaceName, surface] of Object.entries(selected) as [string, Surface][]) {
		console.log(`\n## ${surfaceName} — ${surface.description}`);
		for (const contract of surface.contracts) {
			total++;
			const result = await compareDocsContract(contract, docsRoot, upstreamRoot, options.refresh);
			if (result.error || result.pair?.kind === "diff") {
				diffs++;
				console.log(`  ✗ ${contract.name}: ${result.error ?? "class tokens differ"}`);
				if (result.pair && options.verbose) {
					if (result.pair.removed.length) console.log(`    - ${result.pair.removed.join(" ")}`);
					if (result.pair.added.length) console.log(`    + ${result.pair.added.join(" ")}`);
				}
			} else {
				console.log(`  ✓ ${contract.name}`);
			}
		}
	}
	console.log(`\n${total - diffs}/${total} docs UI contracts match upstream.`);
	if (options.check && diffs > 0) process.exitCode = 1;
	return { total, diffs };
}
