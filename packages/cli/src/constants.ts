export const SITE_BASE_URL = "https://shadcn-svelte.com";
export const TW3_SITE_BASE_URL = "https://tw3.shadcn-svelte.com";
export const OFFICIAL_REGISTRY_URL = `${SITE_BASE_URL}/registry`;

export const ALIASES = ["components", "ui", "hooks", "utils", "lib"] as const;

export const ALIAS_DEFAULTS = ALIASES.reduce(
	(acc, a) => {
		acc[a] = {
			placeholder: `$${a.toUpperCase()}$`,
			defaultPath: a === "utils" ? "$lib/utils" : `$lib/registry/${a}`,
		};
		return acc;
	},
	{} as Record<(typeof ALIASES)[number], { placeholder: string; defaultPath: string }>
);
