import type { Transformer, TransformerResult } from "./index.js";
import { parse as parseSvelte } from "svelte/compiler";
import { walk, type Node } from "estree-walker";
import MagicString from "magic-string";
import { iconLibraries } from "../../icons/libraries.js";
import type { ImportDeclaration } from "acorn";
import { pascalToKebab } from "../casing.js";
import { error } from "../errors.js";

export const transformIcons: Transformer = async ({ content, filePath, config }) => {
	if (!filePath.endsWith(".svelte")) return {};

	const src = new MagicString(content);

	const ast = parseSvelte(content, { filename: filePath, modern: true });

	const iconLibrary = iconLibraries[config.designSystem.iconLibrary];

	const icons: { name: string }[] = [];
	let placeholderImportNode: ImportDeclaration | null = null;

	const enter = (node: Node) => {
		// @ts-expect-error wrong.
		if (node.type === "Component" && node.name === "IconPlaceholder") {
			// @ts-expect-error wrong
			const otherAttributes = node.attributes.filter(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(attr: any) => !Object.keys(iconLibraries).includes(attr.name)
			);

			// @ts-expect-error wrong
			const iconNameAttr = node.attributes.find(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(attr: any) => attr.name === config.designSystem.iconLibrary
			);

			const iconName = iconNameAttr?.value[0]?.data;
			if (!iconName) {
				throw error(
					`Couldn't find icon name attribute for ${config.designSystem.iconLibrary} in ${filePath}. This is a bug please report it here: https://github.com/huntabyte/shadcn-svelte/issues`
				);
			}

			const restProps = otherAttributes
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.map((attr: any) => src.slice(attr.start, attr.end))
				.join(" ");

			let iconSrc: string;
			if (iconLibrary.name === "hugeicons") {
				iconSrc = `<HugeiconsIcon icon={${iconName}} strokeWidth={2} ${restProps} />`;
			} else {
				iconSrc = `<${iconName} ${restProps} />`;
			}

			// @ts-expect-error wrong
			src.overwrite(node.start, node.end, iconSrc);

			icons.push({ name: iconName });
		} else if (node.type === "ImportDeclaration") {
			const specifier = node.specifiers[0];
			if (
				specifier?.type === "ImportDefaultSpecifier" &&
				specifier.local.name === "IconPlaceholder"
			) {
				placeholderImportNode = node as ImportDeclaration;
			}
		}
	};

	walk(ast as never, { enter });

	// replace IconPlaceholder default import with the actual icon imports
	if (placeholderImportNode) {
		const imports =
			iconLibrary.name === "hugeicons"
				? ['import { HugeiconsIcon } from "@hugeicons/svelte"']
				: [];
		if (iconLibrary.name === "lucide") {
			for (const icon of icons) {
				const normalizedName = pascalToKebab(icon.name).replace("-icon", "");
				imports.push(`import ${icon.name} from '@lucide/svelte/icons/${normalizedName}';`);
			}
		} else if (iconLibrary.name === "phosphor") {
			for (const icon of icons) {
				const normalizedName = icon.name.endsWith("Icon")
					? icon.name.slice(0, -4)
					: icon.name;
				imports.push(`import ${icon.name} from 'phosphor-svelte/lib/${normalizedName}';`);
			}
		} else if (iconLibrary.name === "hugeicons") {
			for (const icon of icons) {
				imports.push(`import { ${icon.name} } from '@hugeicons/core-free-icons';`);
			}
		} else if (iconLibrary.name === "tabler") {
			for (const icon of icons) {
				imports.push(`import { ${icon.name} } from '@tabler/icons-svelte';`);
			}
		} else if (iconLibrary.name === "remixicon") {
			for (const icon of icons) {
				// Strip "Ri" prefix and convert to kebab-case for import path
				const withoutPrefix = icon.name.startsWith("Ri") ? icon.name.slice(2) : icon.name;
				const normalizedName = pascalToKebab(withoutPrefix);
				imports.push(
					`import ${icon.name} from 'remixicon-svelte/icons/${normalizedName}';`
				);
			}
		}

		// @ts-expect-error wrong
		src.overwrite(placeholderImportNode.start, placeholderImportNode.end, imports.join("\n"));
	}

	return {
		content: src.toString(),
		devDependencies: placeholderImportNode !== null ? [...iconLibrary.packages] : [],
	} satisfies Partial<TransformerResult>;
};
