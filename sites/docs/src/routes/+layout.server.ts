import { type PackageManager, isPackageManager } from "$lib/stores/package-manager.js";

export function load(event) {
	const packageManager = event.cookies.get("packageManager");

	if (isPackageManager(packageManager)) {
		return {
			packageManager,
		};
	}
	return {
		packageManager: "npm" as PackageManager,
	};
}
