import type { Config } from "./get-config.js";
import * as prettier from "prettier";
import tsBlankSpace from "ts-blank-space";
import prettierPluginSvelte from "prettier-plugin-svelte";
import { strip } from "sv-strip";

const prettierConfig: prettier.Config = {
	useTabs: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 100,
};

export async function transformContent(content: string, filename: string, config: Config) {
	content = transformImports(content, config);

	if (!config.typescript) {
		content = await stripTypes(content, filename);
	}

	return content;
}

export function transformImports(content: string, config: Config) {
	let str = content.replace(/\$lib\/registry\/.*\/components/g, config.aliases.components);
	str = str.replace(/\$lib\/registry\/.*\/ui/g, config.aliases.ui);
	str = str.replace(/\$lib\/registry\/.*\/hook/g, config.aliases.hooks);
	str = str.replace(/\$lib\/utils/g, config.aliases.utils);
	return str;
}

export async function stripTypes(content: string, filename: string) {
	if (filename.endsWith(".svelte")) {
		content = strip(content, { filename });
	} else {
		content = tsBlankSpace(content);
	}

	return await prettier.format(content, {
		...prettierConfig,
		filepath: filename,
		plugins: [prettierPluginSvelte],
		overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	});
}
