import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import template from "lodash.template";
import { rimraf } from "rimraf";
import { colorMapping, colors } from "../src/lib/registry/colors";
import { registrySchema } from "../src/lib/registry/schema";
import { styles } from "../src/lib/registry/styles";
import { themes } from "../src/lib/registry/themes";
import { buildRegistry } from "./registry";
import { transformContent } from "./transformers";
import { BASE_STYLES, BASE_STYLES_WITH_VARIABLES, THEME_STYLES_WITH_VARIABLES } from "./templates";
import { getChunks } from "./transform-chunks.js";

const REGISTRY_PATH = path.resolve("static", "registry");
const REGISTRY_IGNORE = ["super-form"];

async function main() {
	const registry = await buildRegistry();
	const result = registrySchema.safeParse(registry);

	if (!result.success) {
		console.error(result.error);
		process.exit(1);
	}

	// ----------------------------------------------------------------------------
	// Build blocks registry (__registry__/blocks.js) and block chunks (__registry__/chunks/[style]/[block]-[chunk].svelte)
	// ----------------------------------------------------------------------------
	const registryChunksDirPath = path.resolve("src", "__registry__", "chunks");
	const libPath = path.resolve("src", "lib", "registry");
	rimraf.sync(registryChunksDirPath);
	let blocksIndex = `
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
export const Blocks = {
`;
	// Create the __registry__/chunks/[style] dir
	for (const style of styles) {
		blocksIndex += `\t"${style.name}": {`;
		const chunkStyleDir = path.resolve(registryChunksDirPath, style.name);
		// Create directory if it doesn't exist.
		if (!fs.existsSync(chunkStyleDir)) {
			fs.mkdirSync(chunkStyleDir, { recursive: true });
		}
		// Creates chunk files
		for (const block of result.data) {
			if (block.type !== "components:block" || block.style !== style.name) continue;
			const file = block.files[0];
			const blockPath = path.resolve(libPath, block.style, "block", file.name);
			const chunkDir = path.resolve(registryChunksDirPath, block.style);

			const chunks = getChunks(file.content, blockPath);
			for (const chunk of chunks) {
				const chunkPath = path.resolve(chunkDir, `${chunk.name}.svelte`);
				fs.writeFileSync(chunkPath, chunk.content, { encoding: "utf8" });
			}

			blocksIndex += `
		"${block.name}": {
			name: "${block.name}",
			type: "${block.type}",
			chunks: [${chunks.map((chunk) => ` { name: "${chunk.name}", description: "${chunk.description}", container: { className: "${chunk.container.className}" }, raw: () => import("./chunks/${style.name}/${chunk.name}.svelte?raw").then((m) => m.default), component: () => import("./chunks/${style.name}/${chunk.name}.svelte").then((m) => m.default) }`)}],
			component: () => import("../lib/registry/${style.name}/block/${block.name}.svelte").then((m) => m.default),
			raw: () => import("../lib/registry/${style.name}/block/${block.name}.svelte?raw").then((m) => m.default),
		},`;
		}
		// end of style
		blocksIndex += `\n\t},`;
	}
	blocksIndex += "\n};\n";
	const blocksPath = path.resolve("src", "__registry__", "blocks.js");
	fs.writeFileSync(blocksPath, blocksIndex);

	// ----------------------------------------------------------------------------
	// Build __registry__/index.js.
	// ----------------------------------------------------------------------------
	let index = `
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
export const Index = {
`;

	for (const style of styles) {
		index += `	"${style.name}": {`;

		// Build style index.
		for (const item of result.data) {
			if (
				item.type === "components:ui" ||
				item.type === "components:block" ||
				item.style !== "default"
			) {
				continue;
			}
			const type = item.type.split(":")[1];

			const resolveFiles = item.files.map(
				(file) => `../lib/registry/${style.name}/${file.path}`
			);

			index += `
		"${item.name}": {
			name: "${item.name}",
			type: "${item.type}",
			registryDependencies: ${JSON.stringify(item.registryDependencies)},
			component: () => import("../lib/registry/${style.name}/${type}/${
				item.name
			}.svelte").then((m) => m.default),
			files: [${resolveFiles.map((file) => `"${file}"`)}],
			raw: () => import("../lib/registry/${style.name}/${type}/${
				item.name
			}.svelte?raw").then((m) => m.default),
		},`;
		}

		index += `
	},`;
	}

	index += `
}
`;

	// Write style index.
	const registryPath = path.resolve("src", "__registry__", "index.js");
	rimraf.sync(registryPath);
	fs.writeFileSync(registryPath, index);

	// ----------------------------------------------------------------------------
	// Build registry/styles/[style]/[name].json.
	// ----------------------------------------------------------------------------
	// Create the style directories.
	for (const style of styles) {
		const targetPath = path.join(REGISTRY_PATH, "styles", style.name);
		const targetJsPath = `${targetPath}-js`;

		// Create directory if it doesn't exist.
		if (!fs.existsSync(targetPath)) {
			fs.mkdirSync(targetPath, { recursive: true });
		}

		// Create JS directory if it doesn't exist.
		if (!fs.existsSync(targetJsPath)) {
			fs.mkdirSync(targetJsPath, { recursive: true });
		}
	}

	for (const item of result.data) {
		if (item.type !== "components:ui") continue;

		const targetPath = path.join(REGISTRY_PATH, "styles", item.style);
		const targetJsPath = `${targetPath}-js`;

		// discard `path` prop
		const files = item.files.map((file) => ({ ...file, path: undefined }));

		const jsFiles = await Promise.all(
			files.map(async (file) => {
				const content = await transformContent(file.content, file.name);
				const fileName = file.name.replace(".ts", ".js");
				return {
					name: fileName,
					content,
				};
			})
		);

		const payload = {
			...item,
			files,
			style: undefined, // discard `style` prop
		};

		const jsPayload = {
			...item,
			files: jsFiles,
			style: undefined, // discard `style` prop
		};

		fs.writeFileSync(
			path.join(targetPath, `${item.name}.json`),
			JSON.stringify(payload, null, "\t"),
			"utf8"
		);

		fs.writeFileSync(
			path.join(targetJsPath, `${item.name}.json`),
			JSON.stringify(jsPayload, null, "\t"),
			"utf8"
		);
	}

	// ----------------------------------------------------------------------------
	// Build registry/styles/index.json.
	// ----------------------------------------------------------------------------
	const stylesJson = JSON.stringify(styles, null, "\t");
	fs.writeFileSync(path.join(REGISTRY_PATH, "styles", "index.json"), stylesJson, "utf8");

	// ----------------------------------------------------------------------------
	// Build registry/index.json.
	// ----------------------------------------------------------------------------
	const names = result.data
		.filter(
			(item) =>
				item.type === "components:ui" &&
				!REGISTRY_IGNORE.includes(item.name) &&
				// We'll use the `default` style as the reference for the index
				item.style === "default"
		)
		.map((item) => ({
			...item,
			style: undefined, // discard `style`
			// The `default` style uses `lucide-svelte`, so we'll discard it for the purposes of the index
			dependencies: item.dependencies.filter((dep) => dep !== "lucide-svelte"),
			// We only want the relative file paths
			files: item.files.map((file) => file.path),
		}));
	const registryJson = JSON.stringify(names, null, "\t");
	rimraf.sync(path.join(REGISTRY_PATH, "index.json"));
	fs.writeFileSync(path.join(REGISTRY_PATH, "index.json"), registryJson, "utf8");

	// ----------------------------------------------------------------------------
	// Build registry/colors/index.json.
	// ----------------------------------------------------------------------------
	const colorsTargetPath = path.join(REGISTRY_PATH, "colors");
	rimraf.sync(colorsTargetPath);
	if (!fs.existsSync(colorsTargetPath)) {
		fs.mkdirSync(colorsTargetPath, { recursive: true });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const colorsData: Record<string, any> = {};
	for (const [color, value] of Object.entries(colors)) {
		if (typeof value === "string") {
			colorsData[color] = value;
			continue;
		}

		if (Array.isArray(value)) {
			colorsData[color] = value.map((item) => ({
				...item,
				rgbChannel: item.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3"),
				hslChannel: item.hsl.replace(/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/, "$1 $2 $3"),
			}));
			continue;
		}

		if (typeof value === "object") {
			colorsData[color] = {
				...value,
				rgbChannel: value.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3"),
				hslChannel: value.hsl.replace(/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/, "$1 $2 $3"),
			};
			continue;
		}
	}

	fs.writeFileSync(
		path.join(colorsTargetPath, "index.json"),
		JSON.stringify(colorsData, null, "\t"),
		"utf8"
	);

	// ----------------------------------------------------------------------------
	// Build registry/colors/[base].json.
	// ----------------------------------------------------------------------------

	for (const baseColor of ["slate", "gray", "zinc", "neutral", "stone", "lime"]) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const base: Record<string, any> = {
			inlineColors: {},
			cssVars: {},
		};
		for (const [mode, values] of Object.entries(colorMapping)) {
			base.inlineColors[mode] = {};
			base.cssVars[mode] = {};
			for (const [key, value] of Object.entries(values)) {
				if (typeof value === "string") {
					const resolvedColor = value.replace(/\{\{base\}\}-/g, `${baseColor}-`);
					base.inlineColors[mode][key] = resolvedColor;

					const [resolvedBase, scale] = resolvedColor.split("-");
					const color = scale
						? colorsData[resolvedBase].find(
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								(item: any) => item.scale === Number.parseInt(scale)
							)
						: colorsData[resolvedBase];
					if (color) {
						base.cssVars[mode][key] = color.hslChannel;
					}
				}
			}
		}

		// Build css vars.
		base.inlineColorsTemplate = template(BASE_STYLES)({});
		base.cssVarsTemplate = template(BASE_STYLES_WITH_VARIABLES)({
			colors: base.cssVars,
		});

		fs.writeFileSync(
			path.join(REGISTRY_PATH, "colors", `${baseColor}.json`),
			JSON.stringify(base, null, "\t"),
			"utf8"
		);
	}

	// ----------------------------------------------------------------------------
	// Build registry/themes.css
	// ----------------------------------------------------------------------------

	const themeCSS = [];
	for (const theme of themes) {
		themeCSS.push(
			template(THEME_STYLES_WITH_VARIABLES)({
				colors: theme.cssVars,
				theme: theme.name,
			})
		);
	}

	fs.writeFileSync(path.join(REGISTRY_PATH, `themes.css`), themeCSS.join("\n"), "utf8");

	console.info("✅ Done!");
}

await main();
