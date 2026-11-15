<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	const samples = [
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
			code: "A language that is not in the list renders as plain text.",
		},
	];

	const lines = samples.map((sample) =>
		useHighlightedCode(
			() => sample.code,
			() => sample.language
		)
	);
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	{#each samples as sample, sampleIndex (sample.language)}
		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>{sample.title}</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content>
				{#each lines[sampleIndex].current as line, index (index)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	{/each}
</div>
