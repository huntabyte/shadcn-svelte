import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { compile } from "mdsx";
import { mdsxConfig } from "../mdsx.config.js";
import { highlightCode } from "../src/lib/highlight-code.js";

// Matches shadcn/ui apps/v4/{lib/highlight-code.ts,source.config.ts} at
// 968d8cb9dc42ae5d52e8fd356cf84596ec832a26. Preview/source and Markdown
// intentionally use different palettes; neither pass should recolor the other.
const previewColors = /--shiki-dark:#F97583;--shiki-light:#D73A49/;
const markdownColors = /--shiki-dark:#A0A0A0;--shiki-light:#CF222E/;

async function render(content: string) {
	return (
		await compile(content, {
			config: mdsxConfig,
			filename: "content/highlight-test.md",
			preprocessors: [],
		})
	).code;
}

test("component preview and Usage retain the upstream palette split", async () => {
	const filename = "content/components/collapsible.md";
	const { code } = await compile(readFileSync(filename, "utf8"), {
		config: mdsxConfig,
		filename,
		preprocessors: [],
	});
	const start = code.indexOf('<ComponentPreview name="collapsible-demo"');
	assert.ok(start >= 0);
	const preview = code.slice(start, code.indexOf("</ComponentPreview>", start));
	assert.match(preview, /data-theme="github-dark github-light"/);
	assert.match(preview, previewColors);
	assert.doesNotMatch(preview, /data-theme="vesper/);
	assert.match(preview, /data-line-numbers/);
	assert.match(preview, /__src__=.*collapsible-demo/);
	const usage = code.split('id="usage"')[1]?.split('id="controlled-state"')[0];
	assert.ok(usage);
	assert.match(usage, /data-theme="vesper github-light-default"/);
	assert.match(usage, markdownColors);
});

test("Markdown-only pages preserve titles, highlighted lines and blank lines", async () => {
	const code = await render(
		'# Example\n\n```ts title="usage.ts" {1} showLineNumbers\nimport x from "x"\n\nconst a = 1\n```'
	);
	assert.match(code, markdownColors);
	assert.doesNotMatch(code, /data-theme="github-dark/);
	assert.match(code, /data-rehype-pretty-code-title/);
	assert.match(code, />usage.ts</);
	assert.match(code, /data-highlighted-line/);
	assert.match(code, /data-line-numbers/);
	assert.match(code, /<span data-line=""> <\/span>/);
});

test("multiple previews are highlighted once without leaking across compilations", async () => {
	const content =
		'# Examples\n\n<ComponentPreview name="collapsible-demo" />\n\n<ComponentPreview name="button-demo" />';
	const [first, second] = await Promise.all([render(content), render(content)]);
	assert.equal(first, second);
	assert.equal((first.match(/<figure[^>]*data-rehype-pretty-code-figure/g) ?? []).length, 2);
	assert.doesNotMatch(first, /data-theme="vesper/);
	assert.match(first, previewColors);
});

test("runtime source viewer uses upstream light and dark colors and escapes source", async () => {
	const source = 'import x from "x";\nconst example = "<script>";';
	const code = await highlightCode(source, "typescript");
	assert.match(code, /#F97583/i);
	assert.match(code, /#D73A49/i);
	assert.match(code, /data-line/);
	assert.match(code, /&#x3C;script>/);
	assert.equal(await highlightCode(source, "typescript"), code);
});
