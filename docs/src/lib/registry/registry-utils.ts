import type { RegistryItemFile } from "shadcn-svelte/schema";
import { transformMenu } from "shadcn-svelte/transformers/menu";
import { transformIcons } from "shadcn-svelte/transformers/icons";
import { type IconLibraryName } from "./config.js";
import type { MenuColorValue, StyleName } from "./config.js";

export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

export function transformBlockPath(target: string, type: RegistryItemFile["type"]): string {
	const parts = target.split("/");

	if (type === "registry:page" || type === "registry:file") {
		return `routes/${target}`;
	}

	if (type === "registry:component" || type === "registry:hook") {
		const dir = type === "registry:component" ? "components" : "hooks";
		const idx = parts.indexOf(dir);

		const remainingPath = parts.slice(idx + 1).join("/");
		return `${dir}/${remainingPath}`;
	}

	return target;
}

export function createFileTreeForRegistryItemFiles(
	files: Array<{ target: string; type: RegistryItemFile["type"] }> | undefined
): FileTree[] {
	if (!files || !Array.isArray(files)) {
		return [];
	}

	const root: FileTree[] = [];

	for (const file of files) {
		const path = file.target;
		const parts = path.split("/");
		let currentLevel = root;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);

			if (existingNode) {
				if (isFile) {
					existingNode.path = path;
				} else {
					currentLevel = existingNode.children!;
				}
			} else {
				const newNode: FileTree = isFile
					? { name: part, path }
					: { name: part, children: [] };

				currentLevel.push(newNode);

				if (!isFile) {
					currentLevel = newNode.children!;
				}
			}
		}
	}

	return root;
}

export function transformImportPaths(content: string): string {
	const aliases = {
		ui: "$lib/components/ui",
		utils: "$lib/utils",
		components: "$lib/components",
		hooks: "$lib/hooks",
		lib: "$lib",
	};
	for (const [alias, path] of Object.entries(aliases)) {
		content = content.replaceAll(`$${alias.toUpperCase()}$`, path);
	}
	return content;
}

export type DesignSystemConfig = {
	style: StyleName;
	iconLibrary: IconLibraryName;
	menuColor?: MenuColorValue;
};

const styleCache = new Map<StyleName, Record<string, string>>();

export async function transformDesignSystem(
	content: string,
	filePath: string,
	designSystem: DesignSystemConfig
): Promise<string> {
	let styles: Record<string, string> | undefined = styleCache.get(designSystem.style);
	if (!styles) {
		const styleCss = await import(`./styles/style-${designSystem.style}.css?raw`);
		styles = parseStyleCss(styleCss.default);
		styleCache.set(designSystem.style, styles);
	}

	const config: TransformConfig = {
		style: designSystem.style,
		iconLibrary: designSystem.iconLibrary,
		menuColor: designSystem.menuColor ?? "default",
	};

	const { content: transformedContent } = await transform({ content, filePath, config }, [
		// @ts-expect-error - it's fine
		transformIcons,
		// @ts-expect-error - it's fine
		transformMenu,
		createTransformInjectStyles(styles),
	]);

	return transformedContent;
}

// below here we duplicate some of the functionality from the CLI

type TransformConfig = {
	style: StyleName;
	iconLibrary: IconLibraryName;
	menuColor: MenuColorValue;
};

type TransformOptions = {
	content: string;
	filePath: string;
	config: TransformConfig;
};

type TransformerResult = {
	content: string;
	filePath: string;
};

type Transformer = (opts: TransformOptions) => Promise<Partial<TransformerResult>>;

async function transform(
	opts: TransformOptions,
	transformers: (Transformer | false | undefined)[]
): Promise<TransformerResult> {
	const result = {
		content: opts.content,
		filePath: opts.filePath,
	};
	for (const transformer of transformers.filter(
		(transformer) => transformer !== undefined && transformer !== false
	)) {
		const { content, filePath } = await transformer({
			config: opts.config,
			content: result.content,
			filePath: result.filePath,
		});
		result.content = content ?? result.content;
		result.filePath = filePath ?? result.filePath;
	}
	return result;
}

function createTransformInjectStyles(styles: Record<string, string>): Transformer {
	return async ({ content }) => {
		for (const [className, classes] of Object.entries(styles)) {
			content = content.replace(className, classes);
		}
		return { content };
	};
}

/**
 * Duplicate of the parseStyleCss function from the CLI. Albeit a bit more brittle but since this is just for highlighting and not for the actual transformation I think it will work just fine.
 *
 * @param css
 * @returns
 */
function parseStyleCss(css: string): Record<string, string> {
	const styles: Record<string, string> = {};

	// Match .cn-* class rules and extract their @apply values
	// This regex finds: .cn-class-name { ... @apply classes; ... }
	const ruleRegex = /\.(cn-[\w-]+)\s*\{([^}]*)\}/g;
	const applyRegex = /@apply\s+([^;]+);/g;

	let ruleMatch;
	while ((ruleMatch = ruleRegex.exec(css)) !== null) {
		const className = ruleMatch[1];
		const ruleContent = ruleMatch[2];

		// Find all @apply directives within this rule
		let applyMatch;
		const applyValues: string[] = [];
		while ((applyMatch = applyRegex.exec(ruleContent)) !== null) {
			applyValues.push(applyMatch[1].trim());
		}
		// Reset the regex lastIndex for the next rule
		applyRegex.lastIndex = 0;

		if (applyValues.length > 0) {
			styles[className] = applyValues.join(" ");
		}
	}

	return styles;
}
