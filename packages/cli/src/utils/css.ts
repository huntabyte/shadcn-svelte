export function createGlobalCssFile(): string {
	return `
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));
`;
}
