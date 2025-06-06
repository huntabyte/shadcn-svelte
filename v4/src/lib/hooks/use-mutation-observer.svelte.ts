export function useMutationObserver(
	ref: () => HTMLElement | null,
	callback: MutationCallback,
	options: MutationObserverInit = {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true,
	}
): void {
	const element = $derived(ref());
	$effect(() => {
		if (!element) return;
		const observer = new MutationObserver(callback);
		observer.observe(element, options);
		return () => observer.disconnect();
	});
}
