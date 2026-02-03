import { goto } from "$app/navigation";
import { page } from "$app/state";
import {
	BASE_THEMES,
	DEFAULT_CONFIG,
	designSystemConfigSchema,
	fonts,
	getThemesForBaseColor,
	iconLibraries,
	MENU_ACCENTS,
	MENU_COLORS,
	RADII,
	STYLES,
	type DesignSystemConfig,
} from "$lib/registry/config.js";
import { Context, PersistedState } from "runed";
import { SvelteURLSearchParams } from "svelte/reactivity";
import {
	applyBias,
	RANDOMIZE_BIASES,
	type RandomizeContext,
} from "../../../../routes/(app)/(layout)/(create)/lib/randomize-biases.js";
import { StateHistory } from "runed";

export interface IDesignSystemState extends DesignSystemConfig {
	locks: Lockable;
	lock: (key: keyof Lockable) => void;
	unlock: (key: keyof Lockable) => void;
	reset: () => void;
	randomize: () => void;
	update: (value: Partial<DesignSystemConfig>) => void;
	shareUrl: string;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	iconLibrary: keyof typeof iconLibraries
}

export type Lockable = {
	style: boolean;
	baseColor: boolean;
	theme: boolean;
	iconLibrary: boolean;
	font: boolean;
	item: boolean;
	menuAccent: boolean;
	menuColor: boolean;
	radius: boolean;
	template: boolean;
};

class DesignSystemState implements IDesignSystemState {
	#history: StateHistory<DesignSystemConfig>;
	system: PersistedState<DesignSystemConfig>;
	#locks: PersistedState<Lockable>;
	constructor() {
		this.system = new PersistedState<DesignSystemConfig>("design-system", DEFAULT_CONFIG);
		this.#locks = new PersistedState<Lockable>("locks", {
			style: false,
			baseColor: false,
			theme: false,
			iconLibrary: false,
			font: false,
			item: false,
			menuAccent: false,
			menuColor: false,
			radius: false,
			template: false,
		});

		this.reset = this.reset.bind(this);
		this.randomize = this.randomize.bind(this);

		this.#history = new StateHistory(
			() => this.system.current,
			(value) => this.update(value)
		);
	}

	undo() {
		this.#history.undo();
	}

	redo() {
		this.#history.redo();
	}

	get canUndo() {
		return this.#history.canUndo;
	}

	get canRedo() {
		return this.#history.canRedo;
	}

	// locks

	lock(key: keyof Lockable): void {
		this.#locks.current = { ...this.#locks.current, [key]: true };
	}

	unlock(key: keyof Lockable): void {
		this.#locks.current = { ...this.#locks.current, [key]: false };
	}

	get locks(): Lockable {
		return this.#locks.current;
	}

	// properties

	#getProperty<Key extends keyof DesignSystemConfig>(prop: Key): DesignSystemConfig[Key] {
		const param = page.url.searchParams.get(prop);
		const validated = designSystemConfigSchema.shape[prop].safeParse(param);
		if (param && validated.success) return param as DesignSystemConfig[Key];
		return this.system.current[prop] ?? DEFAULT_CONFIG[prop];
	}

	#setProperty<Key extends keyof DesignSystemConfig>(prop: Key, value: DesignSystemConfig[Key]) {
		// set the search param if the page is /create or the param is already set
		const setParam =
			page.url.pathname.startsWith("/create") || page.url.searchParams.get(prop) !== null;

		if (setParam) {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams);
			searchParams.set(prop, value);
			goto(`${page.url.pathname}?${searchParams.toString()}${page.url.hash}`, {
				replaceState: true,
				noScroll: true,
				keepFocus: true,
			});
		}

		// persist to local storage either way
		this.system.current[prop] = value;
	}

	get baseColor() {
		return this.#getProperty("baseColor");
	}

	set baseColor(value: DesignSystemConfig["baseColor"]) {
		// if the theme is currently set to a base color, we need to update it to this value as well
		const shouldUpdateTheme = BASE_THEMES.some((base) => base.name === this.theme);

		// update localStorage first
		if (shouldUpdateTheme) {
			this.system.current.theme = value;
		}
		this.system.current.baseColor = value;

		// then update URL params in a single goto to avoid race condition
		const setParam =
			page.url.pathname.startsWith("/create") ||
			page.url.searchParams.get("baseColor") !== null ||
			(shouldUpdateTheme && page.url.searchParams.get("theme") !== null);

		if (setParam) {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams);
			searchParams.set("baseColor", value);
			if (shouldUpdateTheme) {
				searchParams.set("theme", value);
			}
			goto(`${page.url.pathname}?${searchParams.toString()}${page.url.hash}`, {
				replaceState: true,
				noScroll: true,
				keepFocus: true,
			});
		}
	}

	get font() {
		return this.#getProperty("font");
	}

	set font(value: DesignSystemConfig["font"]) {
		this.#setProperty("font", value);
	}

	get iconLibrary() {
		return this.#getProperty("iconLibrary");
	}

	set iconLibrary(value: DesignSystemConfig["iconLibrary"]) {
		this.#setProperty("iconLibrary", value);
	}

	get menuAccent() {
		return this.#getProperty("menuAccent");
	}

	set menuAccent(value: DesignSystemConfig["menuAccent"]) {
		this.#setProperty("menuAccent", value);
	}

	get menuColor() {
		return this.#getProperty("menuColor");
	}

	set menuColor(value: DesignSystemConfig["menuColor"]) {
		this.#setProperty("menuColor", value);
	}

	get radius() {
		return this.#getProperty("radius");
	}

	set radius(value: DesignSystemConfig["radius"]) {
		this.#setProperty("radius", value);
	}

	get style() {
		return this.#getProperty("style");
	}

	set style(value: DesignSystemConfig["style"]) {
		this.#setProperty("style", value);
	}

	get theme() {
		return this.#getProperty("theme");
	}

	set theme(value: DesignSystemConfig["theme"]) {
		this.#setProperty("theme", value);
	}

	reset() {
		this.system.current = DEFAULT_CONFIG;
		// remove search
		goto(`${page.url.pathname}${page.url.hash}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true,
		});
	}

	randomize() {
		// Use current value if locked, otherwise randomize.
		const selectedBaseColor = this.locks.baseColor
			? this.baseColor
			: randomItem(BASE_THEMES).name;
		const selectedStyle = this.locks.style ? this.style : randomItem(STYLES).name;

		const context: RandomizeContext = {
			baseColor: selectedBaseColor,
			style: selectedStyle,
		};

		const availableThemes = getThemesForBaseColor(selectedBaseColor);
		const availableFonts = applyBias(fonts, context, RANDOMIZE_BIASES.fonts);
		const availableRadii = applyBias(RADII, context, RANDOMIZE_BIASES.radius);

		const selectedTheme = this.locks.theme ? this.theme : randomItem(availableThemes).name;
		const selectedFont = this.locks.font
			? this.font
			: randomItem(availableFonts).name.replace("font-", "");
		const selectedRadius = this.locks.radius ? this.radius : randomItem(availableRadii).name;
		const selectedIconLibrary = this.locks.iconLibrary
			? this.iconLibrary
			: (randomItem(Object.values(iconLibraries)) as typeof iconLibraries[keyof typeof iconLibraries]).name;
		const selectedMenuAccent = this.locks.menuAccent
			? this.menuAccent
			: randomItem(MENU_ACCENTS).value;
		const selectedMenuColor = this.locks.menuColor
			? this.menuColor
			: randomItem(MENU_COLORS).value;

		// Update context with selected values for potential future biases.
		context.theme = selectedTheme;
		context.font = selectedFont;
		context.radius = selectedRadius;
		context.iconLibrary = selectedIconLibrary;
		context.menuAccent = selectedMenuAccent;
		context.menuColor = selectedMenuColor;

		this.update({
			baseColor: selectedBaseColor,
			style: selectedStyle,
			theme: selectedTheme,
			font: selectedFont,
			radius: selectedRadius,
			iconLibrary: selectedIconLibrary,
			menuAccent: selectedMenuAccent,
			menuColor: selectedMenuColor,
		});
	}

	update(value: Partial<DesignSystemConfig>) {
		const internalValue = { ...this.system.current, ...value };
		this.system.current = internalValue;

		if (page.url.pathname.startsWith("/create")) {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams);
			searchParams.set("baseColor", internalValue.baseColor);
			searchParams.set("style", internalValue.style);
			searchParams.set("theme", internalValue.theme);
			searchParams.set("font", internalValue.font);
			searchParams.set("radius", internalValue.radius);
			searchParams.set("iconLibrary", internalValue.iconLibrary);
			searchParams.set("menuAccent", internalValue.menuAccent);
			searchParams.set("menuColor", internalValue.menuColor);
			goto(`${page.url.pathname}?${searchParams.toString()}${page.url.hash}`, {
				replaceState: true,
				noScroll: true,
				keepFocus: true,
			});
		}
	}

	get shareUrl() {
		const searchParams = new SvelteURLSearchParams();
		searchParams.set("baseColor", this.baseColor);
		searchParams.set("style", this.style);
		searchParams.set("theme", this.theme);
		searchParams.set("font", this.font);
		searchParams.set("radius", this.radius);
		searchParams.set("iconLibrary", this.iconLibrary);
		searchParams.set("menuAccent", this.menuAccent);
		searchParams.set("menuColor", this.menuColor);
		return `${page.url.origin}/create?${searchParams.toString()}`;
	}
}

function randomItem<T>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export const DesignSystemContext = new Context<DesignSystemState>("DesignSystemContext");

export function useDesignSystem(): IDesignSystemState {
	return DesignSystemContext.get();
}

export function setupDesignSystem(): IDesignSystemState {
	return DesignSystemContext.set(new DesignSystemState());
}

export { type DesignSystemState };
