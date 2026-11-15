import type { IconLibraryName } from "shadcn-svelte/icons";
import type { Component } from "svelte";

export const lucideIconLoader = createIconLoader("lucide");
export const tablerIconLoader = createIconLoader("tabler");
export const hugeiconsIconLoader = createIconLoader("hugeicons");
export const phosphorIconLoader = createIconLoader("phosphor");
export const remixiconIconLoader = createIconLoader("remixicon");

export type IconLoader = {
	(icon: string): Promise<Component | null>;
	/**
	 * Returns the icon synchronously when it has already been loaded, `null` when the icon is
	 * known to be missing, and `undefined` when it has not been requested yet. Lets callers skip
	 * the async placeholder render for icons that are already in memory.
	 */
	peek: (icon: string) => Component | null | undefined;
};

export function createIconLoader(iconLibrary: IconLibraryName): IconLoader {
	const preloadedIcons = new Map<string, Component | null>();

	const load = async (icon: string) => {
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

	load.peek = (icon: string) => preloadedIcons.get(icon);

	return load;
}
