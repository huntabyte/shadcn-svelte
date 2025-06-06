export function useIsMac(): { readonly current: boolean } {
	let isMac = $state(false);

	$effect(() => {
		isMac = navigator.platform.includes("MAC");
	});

	return {
		get current(): boolean {
			return isMac;
		},
	};
}
