// !! BROWSER SAFE !!

import { pascalToKebab } from "../utils/utils.js";

export type IconLibraryName = keyof typeof iconLibraries;

export type IconLibrary = {
	name: string;
	title: string;
	packages: string[];
	import: (icon: { name: string }) => string;
	usage: (icon: { name: string }, restProps: string) => string;
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
		import: (icon) => `import { ${icon.name} } from '@tabler/icons-svelte';`,
		usage: (icon, restProps) => `<${icon.name} ${restProps} />`,
		export: (icon) => `export { ${icon.name} } from '@tabler/icons-svelte';`,
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
		usage: (icon, restProps) => `<${icon.name} ${restProps} />`,
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

function toPhosphorName(name: string): string {
	return name.endsWith("Icon") ? name.slice(0, -4) : name;
}

function toRemixKebab(name: string): string {
	const withoutPrefix = name.startsWith("Ri") ? name.slice(2) : name;
	return pascalToKebab(withoutPrefix);
}
