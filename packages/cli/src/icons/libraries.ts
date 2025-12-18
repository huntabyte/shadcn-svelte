export const iconLibraries = {
	lucide: {
		name: "lucide",
		title: "Lucide",
		packages: ["@lucide/svelte"],
		import: "import ICON from '@lucide/svelte/icons/ICON_KEBAB'",
		usage: "<ICON />",
		export: "export { default as ICON } from '@lucide/svelte/icons/ICON_KEBAB'",
	},
	tabler: {
		name: "tabler",
		title: "Tabler Icons",
		packages: ["@tabler/icons-svelte"],
		import: "import { ICON } from '@tabler/icons-svelte'",
		usage: "<ICON />",
		export: "export { ICON } from '@tabler/icons-svelte'",
	},
	hugeicons: {
		name: "hugeicons",
		title: "HugeIcons",
		packages: ["@hugeicons/svelte", "@hugeicons/core-free-icons"],
		import: "import { HugeiconsIcon } from '@hugeicons/svelte'\nimport { ICON } from '@hugeicons/core-free-icons';",
		usage: "<HugeiconsIcon icon={ICON} strokeWidth={2} />",
		export: "export { ICON } from '@hugeicons/core-free-icons'",
	},
	phosphor: {
		name: "phosphor",
		title: "Phosphor Icons",
		packages: ["phosphor-svelte"],
		import: "import ICON from 'phosphor-svelte/lib/ICON'",
		usage: "<ICON />",
		export: "export { default as ICON } from 'phosphor-svelte/lib/ICON_WO_SUFFIX'",
	},
} as const;

export type IconLibraries = typeof iconLibraries;

export type IconLibrary = IconLibraries[keyof IconLibraries];

export type IconLibraryName = keyof IconLibraries;
