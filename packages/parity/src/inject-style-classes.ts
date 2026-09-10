import { stripParityIgnoreComments } from "./parity-ignore.ts";

const SKIP_CN_CLASSES = new Set([
	"cn-menu-translucent",
	"cn-menu-target",
	"cn-logical-sides",
	"cn-rtl-flip",
	"cn-font-heading",
	// Upstream only inlines cn-* on className / cva / mergeProps.
	// These tokens live on other properties (toastOptions.classes.toast,
	// InputOTP containerClassName) so published JSON keeps the token.
	"cn-toast",
	"cn-input-otp",
]);

/**
 * Tailwind arbitrary `calc()` values treat spaces as `_`.
 * `calc(-50%-2px)` and `calc(-50%_-_2px)` compile the same; upstream
 * output uses the underscored form.
 *
 * Hyphens inside `var(--custom-property)` are part of the ident, not
 * minus operators — those must not be spaced.
 */
export function toTailwindArbitraryCalc(value: string): string {
	return value.replace(/\[calc\(([^[\]]+)\)\]/g, (_match, expr: string) => {
		const vars: string[] = [];
		const protectedExpr = expr.replace(/var\((--[\w-]+)\)/g, (raw) => {
			vars.push(raw);
			return `§§${vars.length - 1}§§`;
		});
		const spaced = protectedExpr
			.replaceAll("_", " ")
			.replace(/(?<=[\w%)§])\s*([+*/-])\s*(?=\S)/g, " $1 ")
			.replace(/\s+/g, " ")
			.trim();
		const restored = spaced.replace(/§§(\d+)§§/g, (_m, i: string) => vars[Number(i)]!);
		return `[calc(${restored.replaceAll(" ", "_")})]`;
	});
}

function shouldInlineToken(className: string): boolean {
	if (SKIP_CN_CLASSES.has(className)) return false;
	if (className.endsWith("-logical")) return false;
	return true;
}

function subjectCnClass(selector: string): string | undefined {
	const matches = [...selector.matchAll(/(?:^|[\s.>+~])(cn-[\w-]+)/g)];
	return matches.at(-1)?.[1];
}

/** Last `cn-*` ident in a selector, then merge `@apply` lists like createStyleMap. */
export function parseStyleCss(css: string): Record<string, string> {
	const styles: Record<string, string> = {};
	walkStyleRules(css.replace(/\/\*[\s\S]*?\*\//g, ""), styles);
	return styles;
}

function walkStyleRules(css: string, styles: Record<string, string>) {
	let i = 0;
	while (i < css.length) {
		const open = css.indexOf("{", i);
		if (open === -1) return;
		const selector = css.slice(i, open).trim();
		const close = matchingBrace(css, open);
		if (close === -1) return;
		const body = css.slice(open + 1, close);
		if (!selector.startsWith("@") || selector.startsWith("@apply")) {
			const apply = immediateApply(body);
			if (apply) {
				for (const part of selector.split(",")) {
					const className = subjectCnClass(part.trim());
					if (!className) continue;
					styles[className] = styles[className] ? `${apply} ${styles[className]}` : apply;
				}
			}
		}
		walkStyleRules(body, styles);
		i = close + 1;
	}
}

function matchingBrace(css: string, open: number): number {
	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === "{") depth++;
		else if (css[i] === "}") {
			depth--;
			if (depth === 0) return i;
		}
	}
	return -1;
}

function immediateApply(body: string): string {
	let direct = "";
	let depth = 0;
	for (const char of body) {
		if (char === "{") depth++;
		else if (char === "}") depth = Math.max(0, depth - 1);
		else if (depth === 0) direct += char;
	}
	return [...direct.matchAll(/@apply\s+([^;]+);/g)]
		.map((match) => match[1]!.trim())
		.filter(Boolean)
		.join(" ");
}

/**
 * Replace `cn-*` tokens with the matching style `@apply` utilities.
 *
 * Tokens must be matched as whole class names (longest first) so
 * `cn-attachment` does not rewrite `cn-attachment-media-variant-icon`.
 * Unmapped `cn-*` tokens are stripped, and immediately repeated injected
 * utilities are collapsed — otherwise inlined output repeats CSS that is
 * already on the component (e.g. Attachment.Trigger).
 *
 * `parity-ignore` comments are removed so they never ship in registry JSON.
 */
export function injectStyleClasses(content: string, styleMap: Record<string, string>): string {
	content = stripParityIgnoreComments(content);
	const entries = Object.entries(styleMap)
		.filter(([className]) => shouldInlineToken(className))
		.sort(([a], [b]) => b.length - a.length);

	for (const [className, rawClasses] of entries) {
		const classes = toTailwindArbitraryCalc(rawClasses);
		const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`, "g");
		content = content.replace(regex, classes);

		if (classes) {
			const escapedClasses = classes.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			content = content.replace(
				new RegExp(`(?<![\\w-])(?:${escapedClasses}\\s*){2,}(?![\\w-])`, "g"),
				classes
			);
		}
	}

	content = content.replace(/(?<![\w-])(cn-[\w-]+)(?![\w-])/g, (token) =>
		SKIP_CN_CLASSES.has(token) ? token : ""
	);

	content = content.replace(
		/(")([^"\\]*)(")/g,
		(_match, open: string, body: string, close: string) =>
			`${open}${body.replace(/ {2,}/g, " ").trim()}${close}`
	);

	content = content.replace(/cn\(\s*""\s*,\s*/g, "cn(");

	return toTailwindArbitraryCalc(content);
}
