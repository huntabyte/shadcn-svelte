import MagicString from "magic-string";
import { Config } from "./get-config";

export type TransformOpts = {
	filename: string;
	content: string;
	config: Config;
	// baseColor?: z.infer<typeof registryBaseColorSchema>; - will use later
};

export function transformImports(content: string, config: Config) {
	const s = new MagicString(content);
	s.replaceAll(/@\/registry\/[^/]+/g, config.aliases.components);
	s.replaceAll(/\$lib\/utils/g, config.aliases.utils);
	return s.toString();
}
