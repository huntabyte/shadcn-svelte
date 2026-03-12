import { goto } from "$app/navigation";
import { page } from "$app/state";
import {
	BASE_THEMES,
	getThemesForBaseColor,
	iconLibraries,
	MENU_ACCENTS,
	MENU_COLORS,
	RADII,
	STYLES,
} from "$lib/registry/config.js";
import { Context, PersistedState } from "runed";
import { SvelteURLSearchParams } from "svelte/reactivity";
import {
	applyBias,
	RANDOMIZE_BIASES,
	type RandomizeContext,
} from "../../../../routes/(app)/(layout)/(create)/lib/randomize-biases.js";
import { StateHistory } from "runed";
import { decodePreset, encodePreset, DEFAULT_PRESET_CONFIG, type PresetConfig, PRESET_BASE_COLORS, PRESET_FONTS } from 'shadcn-svelte/preset'

export interface IDesignSystemState extends PresetConfig {
	locks: Lockable;
	lock: (key: keyof Lockable) => void;
	unlock: (key: keyof Lockable) => void;
	reset: () => void;
	randomize: () => void;
	shareUrl: string;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
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
	#history: StateHistory<string>;
	#preset: PersistedState<string>;
	#locks: PersistedState<Lockable>;
	constructor() {
		this.#preset = new PersistedState<string>("design-system-preset", this.#getSearchParam("preset") ?? encodePreset(DEFAULT_PRESET_CONFIG));
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
			() => this.#preset.current,
			(value) => {
				this.#preset.current = value
			}
		);
	}

	private get system(): PresetConfig {
		const preset = decodePreset(this.#preset.current);
		if (!preset) return DEFAULT_PRESET_CONFIG;
		return preset;
	}

	private set system(value: PresetConfig) {
		this.#preset.current = encodePreset(value);
		const searchParams = new SvelteURLSearchParams(page.url.searchParams);
		searchParams.set("preset", this.#preset.current);
		goto(`${page.url.pathname}?${searchParams.toString()}${page.url.hash}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true,
		});
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

	// Helper to safely access searchParams during prerendering
	#getSearchParam(key: string): string | null {
		try {
			return page.url.searchParams.get(key);
		} catch {
			// TODO: Fix prerendering - During prerendering, searchParams is not available
			return null;
		}
	}

	get baseColor() {
		return this.system.baseColor;
	}

	set baseColor(value: PresetConfig["baseColor"]) {
		// if the theme is currently set to a base color, we need to update it to this value as well
		const shouldUpdateTheme = BASE_THEMES.some((base) => base.name === this.theme);

		this.system = {
			...this.system,
			theme: shouldUpdateTheme ? value : this.system.theme,
			baseColor: value,
		};
	}

	get font() {
		return this.system.font;
	}

	set font(value: PresetConfig["font"]) {
		this.system.font = value;
	}

	get iconLibrary() {
		return this.system.iconLibrary;
	}

	set iconLibrary(value: PresetConfig["iconLibrary"]) {
		this.system.iconLibrary = value;
	}

	get menuAccent() {
		return this.system.menuAccent;
	}

	set menuAccent(value: PresetConfig["menuAccent"]) {
		this.system.menuAccent = value;
	}

	get menuColor() {
		return this.system.menuColor;
	}

	set menuColor(value: PresetConfig["menuColor"]) {
		this.system.menuColor = value;
	}

	get radius() {
		return this.system.radius;
	}

	set radius(value: PresetConfig["radius"]) {
		this.system.radius = value;
	}

	get style() {
		return this.system.style;
	}

	set style(value: PresetConfig["style"]) {
		this.system.style = value;
	}

	get theme() {
		return this.system.theme;
	}

	set theme(value: PresetConfig["theme"]) {
		this.system.theme = value;
	}

	reset() {
		this.system = DEFAULT_PRESET_CONFIG;
	}

	randomize() {
		// Use current value if locked, otherwise randomize.
		const selectedBaseColor = this.locks.baseColor
			? this.baseColor
			: randomItem(PRESET_BASE_COLORS);
		const selectedStyle = this.locks.style ? this.style : randomItem(STYLES).name;

		const context: RandomizeContext = {
			baseColor: selectedBaseColor,
			style: selectedStyle,
		};

		const availableThemes = getThemesForBaseColor(selectedBaseColor);
		const availableRadii = applyBias(RADII, context, RANDOMIZE_BIASES.radius);

		const selectedTheme = this.locks.theme ? this.theme : randomItem(availableThemes).name;
		const selectedFont = this.locks.font
			? this.font
			: randomItem(PRESET_FONTS);
		const selectedRadius = this.locks.radius ? this.radius : randomItem(availableRadii).name;
		const selectedIconLibrary = this.locks.iconLibrary
			? this.iconLibrary
			: (
				randomItem(
					Object.values(iconLibraries)
				) as (typeof iconLibraries)[keyof typeof iconLibraries]
			).name;
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

		this.system = {
			baseColor: selectedBaseColor,
			style: selectedStyle,
			theme: selectedTheme,
			font: selectedFont,
			radius: selectedRadius,
			iconLibrary: selectedIconLibrary,
			menuAccent: selectedMenuAccent,
			menuColor: selectedMenuColor,
		};
	}

	get shareUrl() {
		return `${page.url.origin}/create?preset=${this.#preset.current}`;
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
