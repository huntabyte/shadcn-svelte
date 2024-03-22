import { Config } from "./get-config.js";

export type TransformOpts = {
	filename: string;
	content: string;
	config: Config;
	// baseColor?: z.infer<typeof registryBaseColorSchema>; - will use later
};

export function transformImports(content: string, config: Config) {
	let str = content.replace(/\$lib\/registry\/[^/]+/g, config.aliases.components);
	str = str.replace(/\$lib\/utils/g, config.aliases.utils);
	return str;
}
