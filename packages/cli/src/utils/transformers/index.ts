import type { ResolvedConfig } from "../get-config.js";

export type TransformOptions = {
	content: string;
	filePath: string;
	config: ResolvedConfig;
};

export type TransformerResult = {
	content: string;
	dependencies: string[];
	devDependencies: string[];
	filePath: string;
};

export type Transformer = (opts: TransformOptions) => Promise<Partial<TransformerResult>>;

export async function transform(
	opts: TransformOptions,
	transformers: (Transformer | false | undefined)[]
): Promise<TransformerResult> {
	const result = {
		content: opts.content,
		dependencies: new Set<string>(),
		devDependencies: new Set<string>(),
		filePath: opts.filePath,
	};
	for (const transformer of transformers.filter(
		(transformer) => transformer !== undefined && transformer !== false
	)) {
		const { content, dependencies, devDependencies, filePath } = await transformer({
			config: opts.config,
			content: result.content,
			filePath: result.filePath,
		});
		result.content = content ?? result.content;
		dependencies?.forEach((dep) => result.dependencies.add(dep));
		devDependencies?.forEach((dep) => result.devDependencies.add(dep));
		result.filePath = filePath ?? result.filePath;
	}
	return {
		content: result.content,
		dependencies: Array.from(result.dependencies),
		devDependencies: Array.from(result.devDependencies),
		filePath: result.filePath,
	};
}

export { transformStripTypes } from "./transform-strip-types.js";
export { transformIcons } from "./transform-icons.js";
export { transformImports } from "./transform-imports.js";
export { createTransformInjectStyles } from "./transform-inject-styles.js";
