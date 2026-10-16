<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	const output = `$ pnpm test
\x1b[32m✓\x1b[39m src/format.test.ts \x1b[2m(4 tests)\x1b[22m
\x1b[32m✓\x1b[39m src/parse.test.ts \x1b[2m(7 tests)\x1b[22m
\x1b[31m✗\x1b[39m src/stream.test.ts \x1b[2m(3 tests | 1 failed)\x1b[22m

\x1b[31mAssertionError: expected 'hello' to be 'hello world'\x1b[39m

Tests  \x1b[31m1 failed\x1b[39m | \x1b[32m13 passed\x1b[39m (14)`;

	// eslint-disable-next-line no-control-regex
	const plain = output.replace(/\x1b\[[\d;]*m/g, "");

	const lines = useHighlightedCode(
		() => output,
		() => "ansi"
	);
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<TerminalIcon />
				Terminal
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={plain} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content wrap>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
