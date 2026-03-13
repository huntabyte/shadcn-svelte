/** Attempts to determine if a user is on a Mac using `navigator.userAgent`. */
export const isMac = navigator.userAgent.includes("Mac");

/** `⌘` for mac or `Ctrl` for windows */
export const cmdOrCtrl = isMac ? "⌘" : "Ctrl";
/** `⌥` for mac or `Alt` for windows */
export const optionOrAlt = isMac ? "⌥" : "Alt";

/**
 * @deprecated Use `isMac` instead.
 * @returns
 */
export function useIsMac(): { readonly current: boolean } {
	return {
		get current(): boolean {
			return isMac;
		},
	};
}
