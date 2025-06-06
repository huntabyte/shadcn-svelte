export function useIsMac(): { readonly current: boolean } {
	const isMac = $derived(navigator.platform.includes("MAC"));

	return {
		get current(): boolean {
			return isMac;
		},
	};
}
