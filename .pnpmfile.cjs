const LEGACY_TYPESCRIPT_API_PACKAGES = new Set([
	"@sveltejs/kit",
	"svelte-check",
	"typescript-eslint",
]);

function needsLegacyTypeScriptApi(pkg) {
	return (
		LEGACY_TYPESCRIPT_API_PACKAGES.has(pkg.name) || pkg.name?.startsWith("@typescript-eslint/")
	);
}

module.exports = {
	hooks: {
		readPackage(pkg) {
			if (!needsLegacyTypeScriptApi(pkg)) return pkg;

			if (pkg.peerDependencies?.typescript) {
				delete pkg.peerDependencies.typescript;
			}

			pkg.dependencies = {
				...pkg.dependencies,
				typescript: "6.0.3",
			};

			return pkg;
		},
	},
};
