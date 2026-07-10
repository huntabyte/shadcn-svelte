import { browser } from "$app/environment";
import { replaceState } from "$app/navigation";
import { page } from "$app/state";
import { BASE_THEMES, getThemesForBaseColor } from "$lib/registry/config.js";
import { Context, PersistedState } from "runed";
import { SvelteURLSearchParams } from "svelte/reactivity";
import { SHUFFLE_PRESETS } from "../../../../routes/(app)/(layout)/create/lib/shuffle-presets.js";
import { StateHistory } from "runed";
import {
	decodePreset,
	encodePreset,
	DEFAULT_PRESET_CONFIG,
	DEFAULT_PRESETS,
	type PresetConfig,
	PRESET_CHART_COLORS,
} from "shadcn-svelte/preset";

type ChartColorName = (typeof PRESET_CHART_COLORS)[number];

let hasSyncedPresetToUrl = false;

export interface IDesignSystemState extends PresetConfig {
	preset: string;
	chartColor: ChartColorName;
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
	chartColor: boolean;
	iconLibrary: boolean;
	font: boolean;
	fontHeading: boolean;
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
		const initialPreset = this.#getSearchParam("preset");
		this.#preset = new PersistedState<string>(
			"design-system-preset",
			initialPreset ?? encodePreset(DEFAULT_PRESET_CONFIG)
		);
		this.#locks = new PersistedState<Lockable>("locks", {
			style: false,
			baseColor: false,
			theme: false,
			chartColor: false,
			iconLibrary: false,
			font: false,
			fontHeading: false,
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
				this.#setPresetCode(value);
			}
		);

		if (browser && !hasSyncedPresetToUrl && !initialPreset) {
			hasSyncedPresetToUrl = true;
			queueMicrotask(() => this.#replacePresetParam(this.#preset.current));
		}
	}

	private get system(): PresetConfig {
		const preset = decodePreset(this.#preset.current);
		if (!preset) return DEFAULT_PRESET_CONFIG;
		return preset;
	}

	private set system(value: PresetConfig) {
		this.#setPresetCode(encodePreset(value));
	}

	#setPresetCode(code: string) {
		this.#preset.current = code;
		this.#replacePresetParam(code);
	}

	#replacePresetParam(code: string) {
		if (!browser) return;

		const searchParams = new SvelteURLSearchParams(page.url.searchParams);
		searchParams.set("preset", code);
		const query = searchParams.toString();
		replaceState(`${page.url.pathname}${query ? `?${query}` : ""}${page.url.hash}`, page.state);
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

	get preset() {
		return this.#preset.current;
	}

	set preset(code: string) {
		const decoded = decodePreset(code);
		if (!decoded) return;
		this.system = decoded;
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

	#update(system: Partial<PresetConfig>) {
		this.system = {
			...this.system,
			...system,
		};
	}

	get baseColor() {
		return this.system.baseColor;
	}

	set baseColor(value: PresetConfig["baseColor"]) {
		// if the theme is currently set to a base color, we need to update it to this value as well
		const shouldUpdateTheme = BASE_THEMES.some((base) => base.name === this.theme);
		const nextTheme = shouldUpdateTheme ? value : this.system.theme;
		const availableChart = getThemesForBaseColor(value);
		const currentChart =
			this.system.chartColor ?? DEFAULT_PRESET_CONFIG.chartColor ?? "neutral";
		const nextChartColor = availableChart.some((t) => t.name === currentChart)
			? currentChart
			: availableChart[0]!.name;

		this.#update({
			theme: nextTheme,
			baseColor: value,
			chartColor: nextChartColor,
		});
	}

	get font() {
		return this.system.font;
	}

	set font(value: PresetConfig["font"]) {
		this.#update({ font: value });
	}

	get chartColor() {
		return this.system.chartColor ?? DEFAULT_PRESET_CONFIG.chartColor!;
	}

	set chartColor(value: ChartColorName) {
		this.#update({ chartColor: value });
	}

	get fontHeading() {
		return this.system.fontHeading;
	}

	set fontHeading(value: PresetConfig["fontHeading"]) {
		this.#update({ fontHeading: value });
	}

	get iconLibrary() {
		return this.system.iconLibrary;
	}

	set iconLibrary(value: PresetConfig["iconLibrary"]) {
		this.#update({ iconLibrary: value });
	}

	get menuAccent() {
		return this.system.menuAccent;
	}

	set menuAccent(value: PresetConfig["menuAccent"]) {
		this.#update({ menuAccent: value });
	}

	get menuColor() {
		return this.system.menuColor;
	}

	set menuColor(value: PresetConfig["menuColor"]) {
		this.#update({ menuColor: value });
	}

	get radius() {
		return this.system.radius;
	}

	set radius(value: PresetConfig["radius"]) {
		this.#update({ radius: value });
	}

	get style() {
		return this.system.style;
	}

	set style(value: PresetConfig["style"]) {
		const defaults = DEFAULT_PRESETS[value];
		const current = this.system;
		const locks = this.#locks.current;
		this.system = {
			style: value,
			baseColor: locks.baseColor ? current.baseColor : defaults.baseColor,
			theme: locks.theme ? current.theme : defaults.theme,
			chartColor: locks.chartColor
				? (current.chartColor ?? defaults.chartColor ?? DEFAULT_PRESET_CONFIG.chartColor)
				: (defaults.chartColor ?? DEFAULT_PRESET_CONFIG.chartColor),
			iconLibrary: locks.iconLibrary ? current.iconLibrary : defaults.iconLibrary,
			font: locks.font ? current.font : defaults.font,
			fontHeading: locks.fontHeading ? current.fontHeading : defaults.fontHeading,
			menuAccent: locks.menuAccent ? current.menuAccent : defaults.menuAccent,
			menuColor: locks.menuColor ? current.menuColor : defaults.menuColor,
			radius: locks.radius ? current.radius : defaults.radius,
		};
	}

	get theme() {
		return this.system.theme;
	}

	set theme(value: PresetConfig["theme"]) {
		this.#update({ theme: value });
	}

	reset() {
		this.system = { ...DEFAULT_PRESETS[this.style] };
	}

	randomize() {
		const currentCode = this.#preset.current;
		const availableCodes = SHUFFLE_PRESETS.filter((code) => code !== currentCode);
		const decoded = decodePreset(
			randomItem(availableCodes.length > 0 ? availableCodes : SHUFFLE_PRESETS)
		);

		if (!decoded) return;

		const current = this.system;
		const locks = this.#locks.current;
		const preset = {
			...DEFAULT_PRESET_CONFIG,
			...decoded,
		};

		this.system = {
			style: locks.style ? current.style : preset.style,
			baseColor: locks.baseColor ? current.baseColor : preset.baseColor,
			theme: locks.theme ? current.theme : preset.theme,
			chartColor: locks.chartColor
				? current.chartColor
				: ((preset.chartColor ?? preset.theme) as ChartColorName),
			iconLibrary: locks.iconLibrary ? current.iconLibrary : preset.iconLibrary,
			font: locks.font ? current.font : preset.font,
			fontHeading: locks.fontHeading ? current.fontHeading : preset.fontHeading,
			menuAccent: locks.menuAccent ? current.menuAccent : preset.menuAccent,
			menuColor: locks.menuColor ? current.menuColor : preset.menuColor,
			radius: locks.radius ? current.radius : preset.radius,
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
