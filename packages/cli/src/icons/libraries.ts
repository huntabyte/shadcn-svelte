// !! BROWSER SAFE !!

import { pascalToKebab } from "../utils/utils.js";

export type IconLibraryName = keyof typeof iconLibraries;

export type IconLibrary = {
	name: string;
	title: string;
	packages: string[];
	import: (icon: { name: string }) => string;
	usage: (icon: { name: string }, restProps: string, options?: { hasWeight?: boolean }) => string;
	export: (icon: { name: string }) => string;
	getAdditionalImports?: () => string[];
};

export const iconLibraries = {
	lucide: {
		name: "lucide",
		title: "Lucide",
		packages: ["@lucide/svelte"],
		import: (icon) =>
			`import ${icon.name} from '@lucide/svelte/icons/${toLucideKebab(icon.name)}';`,
		usage: (icon, restProps) => `<${icon.name} ${restProps} />`,
		export: (icon) =>
			`export { default as ${icon.name} } from '@lucide/svelte/icons/${toLucideKebab(icon.name)}';`,
	},
	tabler: {
		name: "tabler",
		title: "Tabler",
		packages: ["@tabler/icons-svelte"],
		// Deep imports avoid the package barrel, which re-exports ~6k components and is
		// extremely slow to load in Vite dev (SSR compiles every re-exported component).
		import: (icon) =>
			`import ${icon.name} from '@tabler/icons-svelte/icons/${toTablerKebab(icon.name)}';`,
		usage: (icon, restProps) => `<${icon.name} ${restProps} />`,
		export: (icon) =>
			`export { default as ${icon.name} } from '@tabler/icons-svelte/icons/${toTablerKebab(icon.name)}';`,
	},
	hugeicons: {
		name: "hugeicons",
		title: "HugeIcons",
		packages: ["@hugeicons/svelte", "@hugeicons/core-free-icons"],
		import: (icon) => `import { ${icon.name} } from '@hugeicons/core-free-icons';`,
		usage: (icon, restProps) =>
			`<HugeiconsIcon icon={${icon.name}} strokeWidth={2} ${restProps} />`,
		export: (icon) => `export { ${icon.name} } from '@hugeicons/core-free-icons';`,
		getAdditionalImports: () => ['import { HugeiconsIcon } from "@hugeicons/svelte"'],
	},
	phosphor: {
		name: "phosphor",
		title: "Phosphor",
		packages: ["phosphor-svelte"],
		import: (icon) =>
			`import ${icon.name} from 'phosphor-svelte/lib/${toPhosphorName(icon.name)}';`,
		// Duotone by default, bold for arrows, carets and the other thin glyphs (see phosphorWeight). A weight the
		// component already sets wins.
		usage: (icon, restProps, options) =>
			[
				`<${icon.name}`,
				(options?.hasWeight ?? /(^|\s)(weight\s*=|\{weight\})/.test(restProps))
					? ""
					: `weight="${phosphorWeight(icon.name)}"`,
				restProps.trim(),
				"/>",
			]
				.filter(Boolean)
				.join(" "),
		export: (icon) =>
			`export { default as ${icon.name} } from 'phosphor-svelte/lib/${toPhosphorName(icon.name)}';`,
	},
	remixicon: {
		name: "remixicon",
		title: "Remix Icon",
		packages: ["remixicon-svelte"],
		import: (icon) =>
			`import ${icon.name} from 'remixicon-svelte/icons/${toRemixKebab(icon.name)}';`,
		usage: (icon, restProps) => `<${icon.name} ${restProps} />`,
		export: (icon) =>
			`export { default as ${icon.name} } from 'remixicon-svelte/icons/${toRemixKebab(icon.name)}';`,
	},
} as const satisfies Record<string, IconLibrary>;

function toLucideKebab(name: string): string {
	return pascalToKebab(name).replace("-icon", "");
}

function toTablerKebab(name: string): string {
	return pascalToKebab(name.startsWith("Icon") ? name.slice(4) : name);
}

// The Another UI icon rule: Phosphor duotone for form and field icons, bold for the thin glyphs, where a duotone fill
// reads as a smudge: arrows, carets, dots, text format, and the plain X, Check, Plus and Minus (exact names, so XLogo,
// Checkerboard and PlusMinus are not caught). A name with Circle or Square anywhere in it (CheckCircle,
// CaretCircleDown, DotsThreeCircle, ArrowSquareOut) is a filled shape and stays duotone.
const PHOSPHOR_BOLD =
	/^(Arrow|Caret|Dots|Text(B|Italic|Underline|Strikethrough|Aa|T|Align|H)|(X|Check|Checks|CheckFat|Plus|Minus)$)/;

export function phosphorWeight(name: string): "bold" | "duotone" {
	const base = toPhosphorName(name);
	return PHOSPHOR_BOLD.test(base) && !/Circle|Square/.test(base) ? "bold" : "duotone";
}

function toPhosphorName(name: string): string {
	return name.endsWith("Icon") ? name.slice(0, -4) : name;
}

function toRemixKebab(name: string): string {
	const withoutPrefix = name.startsWith("Ri") ? name.slice(2) : name;
	return pascalToKebab(withoutPrefix);
}
