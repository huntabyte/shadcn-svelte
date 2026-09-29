/**
 * Merge registry theme CSS into an existing stylesheet that already has Tailwind.
 * Skips the leading `@import "tailwindcss"` from the template since the official
 * tailwindcss add-on is responsible for that import.
 */
export function mergeThemeCss(existing: string, templateCss: string): string {
	if (existing.includes("--color-sidebar-ring:")) {
		return existing;
	}

	// replaces the first line of the template CSS with an empty line
	const withoutTailwindImport = templateCss.split("\n").slice(1).join("\n");

	return `${existing.trimEnd()}\n\n${withoutTailwindImport}\n`;
}
