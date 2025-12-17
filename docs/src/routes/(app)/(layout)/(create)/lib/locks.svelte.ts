import { Context } from "runed";

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
	#locks: Lockable = $state.raw({
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

    constructor() {
    }

    lock(key: keyof Lockable): void {
        this.#locks = { ...this.#locks, [key]: true };
    }

    unlock(key: keyof Lockable): void {
        this.#locks = { ...this.#locks, [key]: false };
    }

    get locks(): Lockable {
        return this.#locks;
    }
}

const ctx = new Context<LockState>("LocksContext");

export function setupLocks(): void {
    ctx.set(new LockState());
}

export function useLocks(): LockState {
    return ctx.get();
}
