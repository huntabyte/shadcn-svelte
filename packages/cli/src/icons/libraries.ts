export const iconLibraries = {
  lucide: {
    name: "lucide",
    title: "Lucide",
    packages: ["@lucide/svelte"],
    import: "import ICON from '@lucide/svelte/icons/ICON_SNAKE'",
    usage: "<ICON />",
    export: "@lucide/svelte",
  },
  tabler: {
    name: "tabler",
    title: "Tabler Icons",
    packages: ["@tabler/icons-svelte"],
    import: "import { ICON } from '@tabler/icons-svelte'",
    usage: "<ICON />",
    export: "@tabler/icons-svelte",
  },
  hugeicons: {
    name: "hugeicons",
    title: "HugeIcons",
    packages: ["@hugeicons/svelte", "@hugeicons/core-free-icons"],
    import:
      "import { HugeiconsIcon } from '@hugeicons/svelte'\nimport { ICON } from '@hugeicons/core-free-icons';",
    usage: "<HugeiconsIcon icon={ICON} strokeWidth={2} />",
    export: "@hugeicons/core-free-icons",
  },
} as const

export type IconLibraries = typeof iconLibraries

export type IconLibrary = IconLibraries[keyof IconLibraries]

export type IconLibraryName = keyof IconLibraries
