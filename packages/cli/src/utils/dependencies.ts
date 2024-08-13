import fs from "node:fs";
import { findUp } from "find-up";
import type { PackageJson } from "type-fest";
import { getPackageManager } from "./get-package-manager";

export async function handleDependencies(targetDir: string, dependencies: Set<string>) {
	let missingDependencies: undefined | Set<string>;
	const packageManager = await getPackageManager(targetDir);
	const packageJsonPath = await findUp("package.json", { cwd: targetDir });

	// read `dependencies` from package.json
	if (packageJsonPath && fs.existsSync(packageJsonPath)) {
		try {
			const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
			missingDependencies = new Set<string>();

			dependencies.forEach((dep) => {
				if (!pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]) {
					missingDependencies?.add(dep);
				}
			});
		} catch {}
	}

	return {
		packageManager,
		dependencies: Array.from(missingDependencies || dependencies),
	};
}
