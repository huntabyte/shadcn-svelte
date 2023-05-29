import fs from "fs";
import path from "path";
import type { Node } from "estree-walker";
import { parse } from "acorn";
import { walk } from "estree-walker";

export function setConfig() {
	const svelteConfig = fs.readFileSync(
		path.join(process.cwd(), "svelte.config.js"),
		"utf8"
	);

	const ast = parse(svelteConfig, {
		ecmaVersion: "latest",
		sourceType: "module"
	});

	const newNode = walk(ast as Node, {
		enter(node, parent, prop, index) {
			// get kit config object
			if (
				node.type === "Property" &&
				node.key.type === "Identifier" &&
				node.key.name === "kit"
			) {
				// console.log(JSON.stringify(node.value, null, 2));
				if (
					node.value.type === "ObjectExpression" &&
					node.value.properties
				) {
					// check if alias property exists or not
					const aliasNode = node.value.properties.find((prop) => {
						if (
							prop.type === "Property" &&
							prop.key.type === "Identifier" &&
							prop.key.name === "alias"
						) {
							return true;
						}
					});

					// if alias property doesn't exist, let's create it
					if (!aliasNode) {
					}

					if (
						aliasNode &&
						aliasNode.type === "Property" &&
						aliasNode.value.type === "ObjectExpression"
					) {
						console.log(JSON.stringify(aliasNode, null, 2));
						aliasNode.value.properties.push({
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
						});
						aliasNode.value.properties.push({
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
						});
					}
				}
			}
		}
	});
}
