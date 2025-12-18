import { goto } from "$app/navigation";
import { page } from "$app/state";
import {
	DEFAULT_CONFIG,
	designSystemConfigSchema,
	type DesignSystemConfig,
} from "$lib/registry/config.js";
import { Context, PersistedState } from "runed";
import { SvelteURLSearchParams } from "svelte/reactivity";

export interface IDesignSystemState extends DesignSystemConfig {
	locks: Lockable;
	lock: (key: keyof Lockable) => void;
	unlock: (key: keyof Lockable) => void;
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

	private getProperty<Key extends keyof DesignSystemConfig>(prop: Key): DesignSystemConfig[Key] {
		const param = page.url.searchParams.get(prop);
		const validated = designSystemConfigSchema.shape[prop].safeParse(param);
		if (param && validated.success) return param as DesignSystemConfig[Key];
		return this.system.current[prop] ?? DEFAULT_CONFIG[prop];
	}

	private setProperty<Key extends keyof DesignSystemConfig>(
		prop: Key,
		value: DesignSystemConfig[Key]
	) {
		// set the search param if the page is /create or the param is already set
		const setParam =
			page.url.pathname.startsWith("/create") || page.url.searchParams.get(prop) !== null;

		if (setParam) {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams);
			searchParams.set(prop, value);
			goto(page.url.pathname + "?" + searchParams.toString());
		}

		// persist to local storage either way
		this.system.current[prop] = value;
	}

	get baseColor() {
		return this.getProperty("baseColor");
	}

	set baseColor(value: DesignSystemConfig["baseColor"]) {
		this.setProperty("baseColor", value);
	}

	get font() {
		return this.getProperty("font");
	}

	set font(value: DesignSystemConfig["font"]) {
		this.setProperty("font", value);
	}

	get iconLibrary() {
		return this.getProperty("iconLibrary");
	}

	set iconLibrary(value: DesignSystemConfig["iconLibrary"]) {
		this.setProperty("iconLibrary", value);
	}

	get menuAccent() {
		return this.getProperty("menuAccent");
	}

	set menuAccent(value: DesignSystemConfig["menuAccent"]) {
		this.setProperty("menuAccent", value);
	}

	get menuColor() {
		return this.getProperty("menuColor");
	}

	set menuColor(value: DesignSystemConfig["menuColor"]) {
		this.setProperty("menuColor", value);
	}

	get radius() {
		return this.getProperty("radius");
	}

	set radius(value: DesignSystemConfig["radius"]) {
		this.setProperty("radius", value);
	}

	get style() {
		return this.getProperty("style");
	}

	set style(value: DesignSystemConfig["style"]) {
		this.setProperty("style", value);
	}

	get theme() {
		return this.getProperty("theme");
	}

	set theme(value: DesignSystemConfig["theme"]) {
		this.setProperty("theme", value);
	}
}

export const DesignSystemContext = new Context<DesignSystemState>("DesignSystemContext");

export function useDesignSystem(): IDesignSystemState {
	return DesignSystemContext.get();
}

export function setupDesignSystem(): IDesignSystemState {
	return DesignSystemContext.set(new DesignSystemState());
}

export { type DesignSystemState };
