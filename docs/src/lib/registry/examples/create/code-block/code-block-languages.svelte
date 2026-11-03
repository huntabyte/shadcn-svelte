<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const samples = [
		{
			language: "json",
			title: "package.json",
			code: `{
  "name": "acme-chat",
  "scripts": { "dev": "next dev --turbopack" },
  "dependencies": { "ai": "^6.0.12", "zod": "^4.1.12" }
}`,
		},
		{
			language: "css",
			title: "app/globals.css",
			code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
		},
		{
			language: "python",
			title: "main.py",
			code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
		},
		{
			language: "text",
			title: "notes.txt",
			code: "An unknown language renders as plain lines.",
		},
	];

	const ansi = `$ pnpm test
\x1b[32m✓\x1b[39m src/format.test.ts \x1b[2m(4 tests)\x1b[22m
\x1b[31m✗\x1b[39m src/stream.test.ts \x1b[2m(3 tests | 1 failed)\x1b[22m

Tests  \x1b[31m1 failed\x1b[39m | \x1b[32m6 passed\x1b[39m (7)`;

	const sampleLines = samples.map((sample) =>
		useHighlightedCode(
			() => sample.code,
			() => sample.language
		)
	);
	const lines = useHighlightedCode(
		() => ansi,
		() => "ansi"
	);
</script>

<Example title="Languages">
	<div class="flex flex-col gap-4">
		{#each samples as sample, sampleIndex (sampleIndex)}
			<CodeBlock.Root>
				<CodeBlock.Header>
					<CodeBlock.Title>{sample.title}</CodeBlock.Title>
				</CodeBlock.Header>
				<CodeBlock.Content>
					{#each sampleLines[sampleIndex].current as line, index (index)}
						<CodeBlock.Line code={line} />
					{/each}
				</CodeBlock.Content>
			</CodeBlock.Root>
		{/each}
		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>ANSI</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content wrap>
				{#each lines.current as line, index (index)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	</div>
</Example>
