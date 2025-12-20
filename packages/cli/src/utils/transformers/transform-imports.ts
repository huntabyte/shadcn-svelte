import type { Transformer } from "./index.js";
import { ALIASES, ALIAS_DEFAULTS } from "../../constants.js";

export const transformImports: Transformer = async ({ content, config }) => {
	for (const alias of ALIASES) {
		content = content.replaceAll(ALIAS_DEFAULTS[alias].placeholder, config.aliases[alias]);
	}
	return {
		content,
	};
};
