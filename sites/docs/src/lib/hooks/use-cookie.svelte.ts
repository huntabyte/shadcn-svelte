import { watch } from "runed";

type UseCookieOptions<T> = {
	value: () => T;
	name: string;
	serialize?: (value: T) => string;
};

const defaultOptions = {
	serialize: (value: unknown) => (typeof value === "string" ? value : JSON.stringify(value)),
};
export function useCookie<T>(_options: UseCookieOptions<T>) {
	const options = { ...defaultOptions, ..._options };
	const value = $derived(options.serialize(_options.value()));

	watch.pre(
		() => value,
		() => {
			document.cookie = `${options.name}=${value}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`;
		}
	);
}
