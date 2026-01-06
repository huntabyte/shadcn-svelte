import { parse as parseCss } from "postcss";
import type { CssSchema, CssVars } from "@shadcn-svelte/registry";
import { updateCss, updateCssVars, updateTailwindPlugins } from "./updaters/index.js";

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

	const ast = parseCss(source);

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
