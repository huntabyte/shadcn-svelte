<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
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

	const diff = [
		{ variant: "default", text: "export function Greeting({ name }: Props) {" },
		{ variant: "removed", text: "  return <p>Hello, {name}</p>" },
		{
			variant: "added",
			text: '  return <p className="text-sm">Hello, {name}!</p>',
		},
		{ variant: "default", text: "}" },
	] as const;

	const lines = useHighlightedCode(
		() => diff.map((line) => line.text).join("\n"),
		() => "tsx"
	);
	const sourceLines = useHighlightedCode(
		() => source,
		() => "ts"
	);
</script>

<Example title="Small Combinations">
	<div class="flex flex-col gap-4">
		<CodeBlock.Root size="sm">
			<CodeBlock.Header>
				<CodeBlock.Title>components/greeting.tsx</CodeBlock.Title>
				<CodeBlock.Actions>
					<CodeBlock.CopyButton value={source} />
				</CodeBlock.Actions>
			</CodeBlock.Header>
			<CodeBlock.Content lineNumbers>
				{#each lines.current as line, index (index)}
					<CodeBlock.Line variant={diff[index]?.variant} code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
		<CodeBlock.Root size="sm">
			<CodeBlock.Content lineNumbers startLine={995}>
				{#each sourceLines.current as line, index (index)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	</div>
</Example>
