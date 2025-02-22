import { walk } from "estree-walker";
import { preprocess, parse, type PreprocessorGroup } from "svelte/compiler";
import tsBlankSpace from "ts-blank-space";
import MagicString from "magic-string";

export type TransformOpts = {
	filename: string;
	content: string;
	// baseColor?: z.infer<typeof registryBaseColorSchema>; - will use later
};

export async function transformContent(content: string, filename: string) {
	if (filename.endsWith(".svelte")) {
		return transformSvelteTStoJS(content, filename);
	} else {
		return transformTStoJS(content, filename);
	}
}
async function transformSvelteTStoJS(content: string, filename: string) {
	try {
		const { code } = await preprocess(content, [stripMarkupTypes(), stripScriptTypes()], {
			filename,
		});
		// strip out empty module blocks
		return code.replace("<script module></script>", "").trimStart();
	} catch (e) {
		throw new Error(`Error preprocessing Svelte file: ${filename} \n ${e}`);
	}
}

function transformTStoJS(content: string, filename: string) {
	const output = tsBlankSpace(content, (node) => {
		throw new Error(
			`Error compiling TypeScript to JavaScript for file: ${filename} \n ${node.pos}`
		);
	});

	return output;
}

function stripScriptTypes(): PreprocessorGroup {
	return {
		// strip the `lang="ts"` attribute
		script: ({ content, attributes, filename }) => {
			if (attributes["lang"] !== "ts") return;
			delete attributes["lang"];
			delete attributes["generics"];
			return { code: transformTStoJS(content, filename!).trim(), attributes };
		},
	};
}

function stripMarkupTypes(): PreprocessorGroup {
	return {
		markup: ({ content, filename }) => {
			const ms = new MagicString(content);
			const ast = parse(content, { filename, modern: true });

			// @ts-expect-error simmer down
			walk(ast.fragment, {
				enter(node: (typeof ast)["fragment"]["nodes"][number]) {
					// ignore typescript specific nodes
					if (node.type.startsWith("TS")) return;

					if (node.type === "SnippetBlock") {
						if (node.parameters.length === 0) return;
						// @ts-expect-error relax buddy
						const start = node.parameters.at(0)!.start;
						const end =
							// @ts-expect-error you too
							node.parameters.at(-1)!.typeAnnotation?.end ??
							// @ts-expect-error and you
							node.parameters.at(-1)!.end;

						const params = content.substring(start, end);
						// temporarily wraps the params in an arrow function so that it's parsable
						const arrow = " => {}";
						const wrapped = `(${params})${arrow}`;
						const stripped = transformTStoJS(wrapped, filename!)
							.replace(arrow, "")
							.slice(1, -1);
						ms.update(start, end, stripped);
					} else if (node.type === "ConstTag") {
						// @ts-expect-error hush
						const { start, end } = node.declaration;
						const expression = content.substring(start, end);
						const wrapped = `(${expression})`;
						const stripped = transformTStoJS(wrapped, filename!).slice(1, -1);
						ms.update(start, end, stripped);

						this.skip();
					} else if (node.type === "RenderTag" || node.type === "ExpressionTag") {
						// @ts-expect-error take a breather
						const { start, end } = node.expression;
						const expression = content.substring(start, end);
						const wrapped = `(${expression})`;
						const stripped = transformTStoJS(wrapped, filename!).slice(1, -1);
						ms.update(start, end, stripped);

						this.skip();
					} else if ("expression" in node && typeof node.expression === "object") {
						// @ts-expect-error trust me
						const { start, end } = node.expression;

						const expression = content.substring(start, end);
						const wrapped = `(${expression})`;

						// removes the `()`
						const stripped = transformTStoJS(wrapped, filename!).slice(1, -1);

						ms.update(start, end, stripped);
					}
				},
			});

			return { code: ms.toString() };
		},
	};
}
