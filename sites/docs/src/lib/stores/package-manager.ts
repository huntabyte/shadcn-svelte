import { getContext, setContext } from "svelte";
import { persisted } from "svelte-persisted-store";

const PACKAGE_MANAGER = Symbol("packageManager");

export function setPackageManager(initialValue: PackageManager = "npm") {
	const packageManager = createPackageManagerStore("packageManager", initialValue);
	setContext(PACKAGE_MANAGER, packageManager);
	return packageManager;
}

export function getPackageManager(): ReturnType<typeof setPackageManager> {
	return getContext(PACKAGE_MANAGER);
}

function createPackageManagerStore(key: string, initialValue: PackageManager) {
	const store = persisted(key, initialValue);
	return store;
}

export const packageManagers = ["pnpm", "bun", "yarn", "npm"] as const;
export type PackageManager = (typeof packageManagers)[number];

const packageManagerToScriptCmd: Record<PackageManager, string> = {
	npm: "npx",
	yarn: "yarn dlx",
	pnpm: "pnpm dlx",
	bun: "bunx",
};

export function getPackageManagerScriptCmd(pm: PackageManager): string {
	return packageManagerToScriptCmd[pm];
}

const packageManagerToInstallCmd: Record<PackageManager, string> = {
	npm: "install",
	yarn: "add",
	pnpm: "add",
	bun: "add",
};

export function getPackageManagerInstallCmd(pm: PackageManager): string {
	return packageManagerToInstallCmd[pm];
}

// eslint-disable-next-line ts/no-explicit-any
export function isPackageManager(value: any): value is PackageManager {
	return packageManagers.includes(value);
}
