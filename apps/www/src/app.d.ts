// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			"on:copy-done"?: (e: CustomEvent<T>) => void;
			"on:copy-error"?: (e: CustomEvent<T>) => void;
		}
	}
}

export {};
