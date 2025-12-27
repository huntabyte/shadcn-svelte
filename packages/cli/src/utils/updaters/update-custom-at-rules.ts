import * as cliConfig from "../get-config.js";
import { parse as parseCss } from "postcss";
import fs from "node:fs/promises";

export const CUSTOM_AT_RULES = `/* Custom variants */
@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}

@custom-variant data-closed {
  &:where([data-state="closed"]),
  &:where([data-closed]:not([data-closed="false"])) {
    @slot;
  }
}

@custom-variant data-checked {
  &:where([data-state="checked"]),
  &:where([data-checked]:not([data-checked="false"])) {
    @slot;
  }
}

@custom-variant data-unchecked {
  &:where([data-state="unchecked"]),
  &:where([data-unchecked]:not([data-unchecked="false"])) {
    @slot;
  }
}

@custom-variant data-selected {
  &:where([data-selected="true"]) {
    @slot;
  }
}

@custom-variant data-disabled {
  &:where([data-disabled="true"]),
  &:where([data-disabled]:not([data-disabled="false"])) {
    @slot;
  }
}

@custom-variant data-active {
  &:where([data-state="active"]),
  &:where([data-active]:not([data-active="false"])) {
    @slot;
  }
}

@custom-variant data-horizontal {
  &:where([data-orientation="horizontal"]) {
    @slot;
  }
}

@custom-variant data-vertical {
  &:where([data-orientation="vertical"]) {
    @slot;
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}`;

export type NeededAtRule = {
	name: string;
	code: string;
};

/**
 * The key is the at-rule type i.e. `@custom-variant` and the value is a list of named rules that should be present.
 */
type ExpectedAtRules = Record<string, { name: string; code: string }[]>;

function getExpectedAtRules(): ExpectedAtRules {
	const ast = parseCss(CUSTOM_AT_RULES);

	const atRules: ExpectedAtRules = {};

	ast.walkAtRules((atRule) => {
		if (!["custom-variant", "utility"].includes(atRule.name)) return;
		const ruleNames = atRules[atRule.name] ?? [];
		ruleNames.push({ name: atRule.params, code: atRule.toString() });
		atRules[atRule.name] = ruleNames;
	});

	return atRules;
}

export async function findNeededAtRules(config: cliConfig.ResolvedConfig): Promise<NeededAtRule[]> {
	// only do this for v4 config files
	if (!config.resolvedPaths.tailwindCss.endsWith("css")) return [];

	const code = await fs.readFile(config.resolvedPaths.tailwindCss, "utf-8");

	const ast = parseCss(code);

	const neededAtRules: NeededAtRule[] = [];
	const expectedAtRules = getExpectedAtRules();

	for (const [atRuleType, rules] of Object.entries(expectedAtRules)) {
		const removedRules: NeededAtRule[] = [];

		ast.walkAtRules(atRuleType, (atRule) => {
			for (let i = 0; i < rules.length; i++) {
				const rule = rules[i]!;
				if (atRule.params !== rule.name) continue;
				removedRules.push(rule);
			}
		});

		neededAtRules.push(...rules.filter((rule) => !removedRules.includes(rule)));
	}

	return neededAtRules;
}

export async function updateCustomAtRules(cssPath: string, neededAtRules: NeededAtRule[]): Promise<void> {
	const cssSource = await fs.readFile(cssPath, "utf8");

	const modifiedCss = `${cssSource.trim()}\n\n${neededAtRules.map((rule) => rule.code).join("\n\n")}`;
	await fs.writeFile(cssPath, modifiedCss, "utf8");
}
