<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const source = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`;

	const lines = useHighlightedCode(
		() => source,
		() => "ts"
	);
</script>

<Example title="Syntax Highlighting">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<IconPlaceholder
					lucide="FileCodeIcon"
					tabler="IconFileCode"
					hugeicons="CodeIcon"
					phosphor="FileCodeIcon"
					remixicon="RiFileCodeLine"
				/>
				app/api/chat/route.ts
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={source} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content lineNumbers>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</Example>
