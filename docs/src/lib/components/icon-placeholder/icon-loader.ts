import type { IconLibraryName } from "shadcn-svelte/icons";
import type { Component } from "svelte";

export const lucideIconLoader = createIconLoader("lucide");
export const tablerIconLoader = createIconLoader("tabler");
export const hugeiconsIconLoader = createIconLoader("hugeicons");
export const phosphorIconLoader = createIconLoader("phosphor");
export const remixiconIconLoader = createIconLoader("remixicon");

export function createIconLoader(iconLibrary: IconLibraryName) {
	const preloadedIcons = new Map<string, Component | null>();

	return async (icon: string) => {
		const preloadedIcon = preloadedIcons.get(icon);
		if (preloadedIcon !== undefined) return preloadedIcon;

		let mod: Record<string, Component>;
		try {
			mod = await import(`$lib/registry/icons/__${iconLibrary}__/${icon}.ts`);
		} catch {
			preloadedIcons.set(icon, null);
			return null;
		}
		const Icon = mod[icon];
		preloadedIcons.set(icon, Icon);

		return Icon;
	};
}
