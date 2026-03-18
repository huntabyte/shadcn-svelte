import { browser } from "$app/environment";

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
