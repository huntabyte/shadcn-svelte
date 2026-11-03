<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	let {
		token,
		incomplete,
	}: {
		token: { text: string; lang?: string };
		// True while the closing fence has not arrived yet.
		incomplete: boolean;
	} = $props();

	const language = $derived(token.lang?.split(/\s/)[0] ?? "");
	const lines = useHighlightedCode(
		() => token.text,
		() => language
	);
</script>

<CodeBlock.Root>
	<CodeBlock.Header>
		<CodeBlock.Title>{language || "text"}</CodeBlock.Title>
		<CodeBlock.Actions>
			<CodeBlock.CopyButton value={token.text} disabled={incomplete} />
		</CodeBlock.Actions>
	</CodeBlock.Header>
	<CodeBlock.Content lineNumbers>
		{#each lines.current as line, index (index)}
			<CodeBlock.Line code={line} />
		{/each}
	</CodeBlock.Content>
</CodeBlock.Root>
