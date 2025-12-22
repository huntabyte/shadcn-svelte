import type { IconLibraryName } from "shadcn-svelte/icons";
import type { Component } from "svelte";

export const lucideIconLoader = createIconLoader("lucide");
export const tablerIconLoader = createIconLoader("tabler");
export const hugeiconsIconLoader = createIconLoader("hugeicons");
export const phosphorIconLoader = createIconLoader("phosphor");

export function createIconLoader(iconLibrary: IconLibraryName) {
	const preloadedIcons = new Map<string, Component>();

	return async (icon: string) => {
		const preloadedIcon = preloadedIcons.get(icon);
		if (preloadedIcon) return preloadedIcon;

		const mod = await import(`$lib/registry/icons/__${iconLibrary}__.ts`);

		const Icon = mod[icon];
		preloadedIcons.set(icon, Icon);

		return Icon;
	};
}
