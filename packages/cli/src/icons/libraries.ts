export const iconLibraries = {
	lucide: {
		name: "lucide",
		title: "Lucide",
		packages: ["@lucide/svelte"],
		export: "export { default as ICON } from '@lucide/svelte/icons/ICON_KEBAB'",
	},
	tabler: {
		name: "tabler",
		title: "Tabler",
		packages: ["@tabler/icons-svelte"],
		export: "export { ICON } from '@tabler/icons-svelte'",
	},
	hugeicons: {
		name: "hugeicons",
		title: "HugeIcons",
		packages: ["@hugeicons/svelte", "@hugeicons/core-free-icons"],
		export: "export { ICON } from '@hugeicons/core-free-icons'",
	},
	phosphor: {
		name: "phosphor",
		title: "Phosphor",
		packages: ["phosphor-svelte"],
		export: "export { default as ICON } from 'phosphor-svelte/lib/ICON_WO_SUFFIX'",
	},
} as const;

export type IconLibraries = typeof iconLibraries;

export type IconLibrary = IconLibraries[keyof IconLibraries];

export type IconLibraryName = keyof IconLibraries;
