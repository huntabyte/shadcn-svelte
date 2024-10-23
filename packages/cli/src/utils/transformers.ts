import type { Config } from "./get-config.js";

export function transformImports(content: string, config: Config) {
	let str = content.replace(/\$lib\/registry\/.*\/components/g, config.aliases.components);
	str = str.replace(/\$lib\/registry\/.*\/ui/g, config.aliases.ui);
	str = str.replace(/\$lib\/registry\/.*\/hook/g, config.aliases.hooks);
	str = str.replace(/\$lib\/utils/g, config.aliases.utils);
	return str;
}
