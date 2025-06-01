export function useIsMac() {
	let isMac = $state(false);

	$effect(() => {
		isMac = navigator.platform.includes("MAC");
	});

	return {
		get current() {
			return isMac;
		},
	};
}
