import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { preprocess } from "svelte/compiler";
import ts from "typescript";
import prettier from "prettier";

export type TransformOpts = {
	filename: string;
	content: string;
	// baseColor?: z.infer<typeof registryBaseColorSchema>; - will use later
};

const sharedPrettierConfig = {
	useTabs: true,
	tabWidth: 4,
	singleQuote: false,
	trailingComma: "es5" as const,
	printWidth: 100,
	endOfLine: "lf" as const,
	bracketSameLine: false,
};

const registrySveltePrettierConfig = {
	...sharedPrettierConfig,
	pluginSearchDirs: ["./node_modules/prettier-plugin-svelte"],
	parser: "svelte",
	svelteStrictMode: false,
	plugins: ["prettier-plugin-svelte"],
};

const registryJSPrettierConfig = {
	...sharedPrettierConfig,
	parser: "babel",
};

export async function transformContent(content: string, filename: string) {
	// The rest is for transforming typescript to javascript
	if (filename.endsWith(".svelte")) {
		return prettier.format(
			await transformSvelteTStoJS(content, filename),
			registrySveltePrettierConfig
		);
	} else {
		return prettier.format(transformTStoJS(content, filename), registryJSPrettierConfig);
	}
}

async function transformSvelteTStoJS(content: string, filename: string) {
	try {
		const { code } = await preprocess(content, [vitePreprocess()]);
		let s = code.replaceAll(/<script lang=['"]ts['"]>/g, "<script>");
		s = s.replaceAll(/void 0/g, "undefined");
		return s;
	} catch (e) {
		throw new Error(`Error preprocessing Svelte file: ${filename} \n ${e}`);
	}
}

const compilerOptions: ts.CompilerOptions = {
	target: ts.ScriptTarget.ESNext,
	module: ts.ModuleKind.ESNext,
	isolatedModules: true,
	preserveValueImports: true,
	lib: ["esnext", "DOM", "DOM.Iterable"],
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	esModuleInterop: true,
	ignoreDeprecations: "5.0",
};

function transformTStoJS(content: string, filename: string) {
	const { outputText, diagnostics } = ts.transpileModule(content, {
		compilerOptions,
		reportDiagnostics: true,
	});

	// Check for compilation errors
	if (diagnostics && diagnostics.length > 0) {
		// Throw the errors so the user can see them/create an issue about them.
		throw new Error(
			`Error compiling TypeScript to JavaScript for file: ${filename} \n ${diagnostics}`
		);
	} else {
		return outputText;
	}
}
