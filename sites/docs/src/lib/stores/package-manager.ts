import { getContext, setContext } from "svelte";
import { persisted } from "svelte-persisted-store";
import type { Agent } from "package-manager-detector";

const PACKAGE_MANAGER = Symbol("packageManager");

export function setPackageManager(initialValue: Agent) {
	const packageManager = createPackageManagerStore("packageManager", initialValue);
	setContext(PACKAGE_MANAGER, packageManager);
	return packageManager;
}

export function getPackageManager(): ReturnType<typeof setPackageManager> {
	return getContext(PACKAGE_MANAGER);
}

function createPackageManagerStore(key: string, initialValue: Agent) {
	const store = persisted(key, initialValue);
	return store;
}
