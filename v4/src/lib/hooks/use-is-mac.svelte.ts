import { browser } from "$app/environment";

export function useIsMac(): { readonly current: boolean } {
	const isMac = $derived(browser ? navigator.platform.includes("MAC") : false);

	return {
		get current(): boolean {
			return isMac;
		},
	};
}
