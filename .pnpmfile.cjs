function needsLegacyTypeScriptApi(pkg) {
	return pkg.name === "typescript-eslint" || pkg.name?.startsWith("@typescript-eslint/");
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
