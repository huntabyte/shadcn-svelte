import { parse } from "postcss";
import { transform } from "sucrase";
import { strip } from "@svecosystem/strip-types";
import type { CssSchema, CssVars } from "@shadcn-svelte/registry";
import { ALIASES, ALIAS_DEFAULTS } from "../constants.js";
import { updateCss, updateCssVars, updateTailwindPlugins } from "./updaters/index.js";
import type { ResolvedConfig } from "./get-config.js";

const CONSECUTIVE_NEWLINE_REGEX = new RegExp(/^\s\s*\n+/gm);

export async function transformContent(content: string, filename: string, config: ResolvedConfig) {
	content = transformImports(content, config);

	if (!config.typescript) {
		content = await stripTypes(content, filename);
	}

	return content;
}

export function transformImports(content: string, config: ResolvedConfig) {
	for (const alias of ALIASES) {
		content = content.replaceAll(ALIAS_DEFAULTS[alias].placeholder, config.aliases[alias]);
	}
	return content;
}

export async function stripTypes(content: string, filename: string) {
	if (filename.endsWith(".svelte")) {
		content = strip(content, { filename });
	} else {
		content = transform(content, {
			transforms: ["typescript"],
			disableESTransforms: true,
		}).code.trim();
	}

	// cursed formatting
	return content.replaceAll(CONSECUTIVE_NEWLINE_REGEX, "\n");
}

type TransformCssOptions = {
	cssVars?: CssVars;
	css?: CssSchema;
	/** Array of plugin names to update */
	plugins?: string[];
};

export function transformCss(source: string, options?: TransformCssOptions): string {
	const trailingNewline = source.endsWith("\n");
	const opts = { plugins: [], ...options };

	// if no CSS variables are provided to update and no plugins,
	// we don't need to do anything so we can just return the source
	if (!opts.cssVars && !opts.css && !opts.plugins.length) return source;

	const ast = parse(source);

	// add plugins if any
	if (opts.plugins.length) {
		updateTailwindPlugins(ast, opts.plugins);
	}

	// update CSS variables/themes
	if (opts.cssVars) updateCssVars(ast, opts.cssVars);

	if (opts.css) updateCss(ast, opts.css);

	let output = ast.toString();
	output = output.replace(/\/\* ---break--- \*\//g, "");
	output = output.replace(/(\n\s*\n)+/g, "\n\n");
	output = output.trimEnd();

	// adds the EOF new line, if it existed
	if (trailingNewline && !output.endsWith("\n")) {
		output += "\n";
	}

	return output;
}
