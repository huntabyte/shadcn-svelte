export const SITE_BASE_URL = "https://next.shadcn-svelte.com";

export const ALIASES = ["components", "ui", "hooks", "lib", "utils"] as const;

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
