/** Attempts to determine if a user is on a Mac using `navigator.userAgent`. */
export const isMac = navigator.userAgent.includes("Mac");

export function useIsMac(): {
	readonly current: boolean;
	readonly cmdOrCtrl: string;
	readonly optionOrAlt: string;
} {
	const isMac = $derived(browser ? navigator.userAgent.includes("Mac") : false);

	return {
		get current(): boolean {
			return isMac;
		},
		get cmdOrCtrl(): string {
			return isMac ? "⌘" : "Ctrl";
		},
		get optionOrAlt(): string {
			return isMac ? "⌥" : "Alt";
		},
	};
}
