import type { Config } from "./get-config.js";

export function transformImports(content: string, config: Config) {
	let str = content.replace(/\$lib\/registry\/[^/]+/g, config.aliases.components);
	str = str.replace(/\$lib\/utils/g, config.aliases.utils);
	return str;
}
