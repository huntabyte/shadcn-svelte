import type { Config } from "./get-config.js";
import sucrase from "sucrase";
import { strip } from "sv-strip";

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
		content = sucrase.transform(content, { transforms: ["typescript"] }).code.trim();
	}

	// cursed formatting
	return content.replaceAll(CONSECUTIVE_NEWLINE_REGEX, "\n");
}
