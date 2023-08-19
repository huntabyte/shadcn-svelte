import fs from "fs";
import path from "path";
import type { Property } from "estree";
import type { Node } from "estree-walker";
import { Comment, parse } from "acorn";
import { generate } from "astring";
import { walk } from "estree-walker";
import prettier from "prettier";
// @ts-expect-error no types
// had to manually add this package since their package.json is misconfigured
import { attachComments } from "../astravel";

const SVELTE_CONFIG_PATH = path.join(process.cwd(), "svelte.config.js");
const IMPORT_SVELTE_CONFIG_PATH = "file://" + SVELTE_CONFIG_PATH;

/**
 * Parse the svelte.config.js file into an abstract syntax tree (AST),
 * then walk the tree to find the config object and add the shadcn
 * property to it with the componentPath property.
 */
export async function setConfig(dir: string = "./src/lib/components/ui") {
	const { default: config } = await import(IMPORT_SVELTE_CONFIG_PATH);
	if (!config) {
		throw new Error("Could not find config for svelte.config.js");
	}

	const { ast, comments } = await parseSvelteConfig();

	const updatedSvelteConfig = walk(ast as Node, {
		enter(node) {
			if (
				node.type === "VariableDeclaration" &&
				node.kind === "const" &&
				node.declarations[0].type === "VariableDeclarator" &&
				node.declarations[0].id.type === "Identifier" &&
				node.declarations[0].id.name === "config"
			) {
				const configNode = node.declarations[0];
				if (
					configNode.init &&
					configNode.init.type === "ObjectExpression"
				) {
					configNode.init.properties.push(createConfigNode(dir));
				}
			}
		}
	});

	if (!updatedSvelteConfig) {
		throw new Error("Could not update svelte.config.js");
	}

	attachComments(updatedSvelteConfig, comments);
	const updatedSvelteConfigString = generate(updatedSvelteConfig, {
		comments: true
	});

	return formatFile(updatedSvelteConfigString, SVELTE_CONFIG_PATH);
}

/**
 * Parse the svelte.config.js file into an abstract syntax tree (AST),
 * then walk the tree to find the config object and adds the alias
 * property to it
 */
export async function addAliases(dir: string = "./src/lib/components/ui") {
	const { ast, comments } = await parseSvelteConfig();

	const updatedSvelteConfig = walk(ast as Node, {
		enter(node) {
			if (
				node.type === "Property" &&
				node.key.type === "Identifier" &&
				node.key.name === "kit" &&
				node.value.type === "ObjectExpression"
			) {
				// check if `alias` is already defined
				const aliasProp = node.value.properties.find(
					(n) =>
						n.type === "Property" &&
						n.value.type === "ObjectExpression" &&
						n.key.type === "Identifier" &&
						n.key.name === "alias"
				) as Property | undefined;

				if (!aliasProp) {
					// alias is not defined so we'll add it
					node.value.properties.push(createAliasNode());
					return;
				}

				if (
					aliasProp.type === "Property" &&
					aliasProp.value.type === "ObjectExpression"
				) {
					aliasProp.value.properties.push(...createAliasProperties());
				}
			}
		}
	});

	if (!updatedSvelteConfig) {
		throw new Error("Could not update svelte.config.js");
	}

	attachComments(updatedSvelteConfig, comments);
	const updatedSvelteConfigString = generate(updatedSvelteConfig, {
		comments: true
	});

	return formatFile(updatedSvelteConfigString, SVELTE_CONFIG_PATH);
}

async function parseSvelteConfig() {
	const { default: config } = await import(IMPORT_SVELTE_CONFIG_PATH);
	if (!config) {
		throw new Error("Could not find config for svelte.config.js");
	}

	const svelteConfig = fs.readFileSync(SVELTE_CONFIG_PATH, "utf8");

	const comments: Comment[] = [];
	const ast = parse(svelteConfig, {
		ecmaVersion: "latest",
		sourceType: "module",
		onComment: comments
	});

	return { ast, comments };
}

function formatFile(content: string, path: string) {
	const prettierConfigFile = prettier.resolveConfigFile.sync(path);
	if (!prettierConfigFile) {
		return fs.writeFileSync(path, content);
	}

	const prettierConfig = prettier.resolveConfig.sync(prettierConfigFile);
	if (!prettierConfig) {
		return fs.writeFileSync(path, content);
	}

	const formattedContent = prettier.format(content, {
		...prettierConfig,
		parser: "babel"
	});
	return fs.writeFileSync(path, formattedContent);
}

function createConfigNode(dir: string): Property {
	return {
		type: "Property",
		method: false,
		shorthand: false,
		computed: false,
		key: {
			type: "Identifier",
			name: "shadcn"
		},
		value: {
			type: "ObjectExpression",
			properties: [
				{
					type: "Property",
					method: false,
					shorthand: false,
					computed: false,
					key: {
						type: "Identifier",
						name: "componentPath"
					},
					value: {
						type: "Literal",
						value: dir,
						raw: `'${dir}'`
					},
					kind: "init"
				}
			]
		},
		kind: "init"
	};
}

function createAliasNode(): Property {
	return {
		type: "Property",
		method: false,
		shorthand: false,
		computed: false,
		key: {
			type: "Identifier",
			name: "alias"
		},
		value: {
			type: "ObjectExpression",
			properties: createAliasProperties()
		},
		kind: "init"
	};
}

function createAliasProperties(): Property[] {
	return [
		{
			type: "Property",
			method: false,
			shorthand: false,
			computed: false,
			key: {
				type: "Identifier",
				name: "$components"
			},
			value: {
				type: "Literal",
				value: "src/lib/components",
				raw: '"src/lib/components"'
			},
			kind: "init"
		},
		{
			type: "Property",
			method: false,
			shorthand: false,
			computed: false,
			key: {
				type: "Literal",
				value: "$components/*",
				raw: '"$components/*"'
			},
			value: {
				type: "Literal",
				value: "src/lib/components/*",
				raw: '"src/lib/components/*"'
			},
			kind: "init"
		}
	];
}
