// Source: https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/utilities/LightSwitch/lightswitch.ts

// Lightswitch Service

import { get } from "svelte/store";
// DO NOT replace this ⬇ import, it has to be imported directly
import { localStorageStore } from "./local-storage-store";

// Stores ---
// TRUE: light, FALSE: dark

/** Store: OS Preference Mode */
export const modeOsPrefers = localStorageStore<boolean>("modeOsPrefers", false);
/** Store: User Preference Mode */
export const modeUserPrefers = localStorageStore<boolean | undefined>(
	"modeUserPrefers",
	undefined
);
/** Store: Current Mode State */
export const modeCurrent = localStorageStore<boolean>("modeCurrent", false);

// Get ---

/** Get the OS Preference for light/dark mode */
export function getModeOsPrefers(): boolean {
	const prefersLightMode = window.matchMedia(
		"(prefers-color-scheme: light)"
	).matches;
	modeOsPrefers.set(prefersLightMode);
	return prefersLightMode;
}

/** Get the User for light/dark mode */
export function getModeUserPrefers(): boolean | undefined {
	return get(modeUserPrefers);
}

/** Get the Automatic Preference light/dark mode */
export function getModeAutoPrefers(): boolean {
	const os = getModeOsPrefers();
	const user = getModeUserPrefers();
	const modeValue = user !== undefined ? user : os;
	return modeValue;
}

// Set ---

/** Set the User Preference for light/dark mode */
export function setModeUserPrefers(value: boolean): void {
	modeUserPrefers.set(value);
}

/** Set the the current light/dark mode */
export function setModeCurrent(value: boolean) {
	const elemHtmlClasses = document.documentElement.classList;
	const classDark = `dark`;
	value === true
		? elemHtmlClasses.remove(classDark)
		: elemHtmlClasses.add(classDark);
	modeCurrent.set(value);
}

// Lightswitch Utility

/** Set the visible light/dark mode on page load. */
export function setInitialClassState() {
	const htmlEl = document.documentElement;

	const htmlElClasses = htmlEl.classList;
	// Conditions
	const condLocalStorageUserPrefs =
		localStorage.getItem("modeUserPrefers") === "false";
	const condLocalStorageUserPrefsExists = !(
		"modeUserPrefers" in localStorage
	);
	const condMatchMedia = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;
	// Add/remove `.dark` class to HTML element
	if (
		condLocalStorageUserPrefs ||
		(condLocalStorageUserPrefsExists && condMatchMedia)
	) {
		htmlElClasses.add("dark");
		htmlEl.style.colorScheme = "dark";
	} else {
		htmlElClasses.remove("dark");
		htmlEl.style.colorScheme = "light";
	}
}

// Auto-Switch Utility

/** Automatically set the visible light/dark, updates on change. */
export function autoModeWatcher(): void {
	const mql = window.matchMedia("(prefers-color-scheme: light)");
	function setMode(value: boolean) {
		const htmlEl = document.documentElement;
		const htmlElClasses = htmlEl.classList;
		const classDark = `dark`;

		if (value === true) {
			htmlElClasses.remove(classDark);
			htmlEl.style.colorScheme = "light";
		} else {
			htmlElClasses.add(classDark);
			htmlEl.style.colorScheme = "dark";
		}
	}
	setMode(mql.matches);
	mql.onchange = () => {
		setMode(mql.matches);
	};
}
