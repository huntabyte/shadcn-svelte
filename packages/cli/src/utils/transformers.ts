import { parse } from "postcss";
import { transform } from "sucrase";
import { strip } from "@svecosystem/strip-types";
import { updateCssVars, updateTailwindPlugins } from "./updaters.js";
import type { Config } from "./get-config.js";
import type { CssVars } from "@shadcn-svelte/registry";

const CONSECUTIVE_NEWLINE_REGEX = new RegExp(/^\s\s*\n+/gm);

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
		content = transform(content, { transforms: ["typescript"] }).code.trim();
	}

	// cursed formatting
	return content.replaceAll(CONSECUTIVE_NEWLINE_REGEX, "\n");
}

type TransformCssOptions = {
	/** Array of plugin names to update */
	plugins?: string[];
};

export function transformCss(
	source: string,
	cssVars: CssVars,
	options: TransformCssOptions = {}
): string {
	const opts = { plugins: [], ...options };

	// if no CSS variables are provided to update and no plugins,
	// we don't need to do anything so we can just return the source
	if (Object.keys(cssVars).length === 0 && !opts.plugins.length) return source;

	const ast = parse(source);

	// add plugins if any
	if (opts.plugins.length) {
		updateTailwindPlugins(ast, opts.plugins);
	}

	// update CSS variables/themes
	updateCssVars(ast, cssVars);

	return ast.toString();
}
