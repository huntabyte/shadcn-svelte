import { Context, PersistedState } from "runed";

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

class LockState {
	#locks: PersistedState<Lockable>;

	constructor() {
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

	lock(key: keyof Lockable): void {
		this.#locks.current = { ...this.#locks.current, [key]: true };
	}

	unlock(key: keyof Lockable): void {
		this.#locks.current = { ...this.#locks.current, [key]: false };
	}

	get locks(): Lockable {
		return this.#locks.current;
	}
}

const ctx = new Context<LockState>("LocksContext");

export function setupLocks(): void {
	ctx.set(new LockState());
}

export function useLocks(): LockState {
	return ctx.get();
}
