import { browser } from "$app/environment";

export function useIsMac(): { readonly current: boolean } {
	const isMac = $derived(browser ? navigator.platform.includes("Mac") : false);

	return {
		get current(): boolean {
			return isMac;
		},
	};
}
