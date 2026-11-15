<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
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

<Example title="Chat Answer">
	<div class="flex flex-col gap-4 text-sm">
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root>
					<Bubble.Content>How do I stream a response?</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Content class="gap-3">
				<p>Create a route handler that returns the stream:</p>
				<CodeBlock.Root>
					<CodeBlock.Header>
						<CodeBlock.Title>app/api/chat/route.ts</CodeBlock.Title>
						<CodeBlock.Actions>
							<CodeBlock.CopyButton value={source} />
						</CodeBlock.Actions>
					</CodeBlock.Header>
					<CodeBlock.Content>
						{#each lines.current as line, index (index)}
							<CodeBlock.Line code={line} />
						{/each}
					</CodeBlock.Content>
				</CodeBlock.Root>
				<p>The client reads it with useChat.</p>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
