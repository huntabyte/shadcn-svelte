import fs from "fs";
import path from "path";
import type { Property } from "estree";
import type { Node } from "estree-walker";
import { parse } from "acorn";
import { generate } from "astring";
import { walk } from "estree-walker";

export function setConfig(dir: string = "./src/lib/components/ui") {
	const svelteConfig = fs.readFileSync(
		path.join(process.cwd(), "svelte.config.js"),
		"utf8"
	);

	const ast = parse(svelteConfig, {
		ecmaVersion: "latest",
		sourceType: "module"
	});

	const updatedSvelteConfig = walk(ast as Node, {
		enter(node, parent, prop, index) {
			// get kit config object
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
					console.log(JSON.stringify(configNode, null, 2));
				}
			}
		}
	});

	if (!updatedSvelteConfig) {
		throw new Error("Could not update svelte.config.js");
	}

	fs.writeFileSync(
		path.join(process.cwd(), "svelte.config.js"),
		generate(updatedSvelteConfig)
	);
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
