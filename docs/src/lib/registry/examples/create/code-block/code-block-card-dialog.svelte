<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";
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

	const command = useHighlightedCode(
		() => "pnpm add ai @ai-sdk/react zod",
		() => "bash"
	);
	const lines = useHighlightedCode(
		() => source,
		() => "ts"
	);
</script>

<Example title="Card and Dialog">
	<div class="flex flex-col items-start gap-4">
		<Card.Root class="w-full">
			<Card.Header>
				<Card.Title>Install the AI SDK</Card.Title>
				<Card.Description>Add the packages to your project.</Card.Description>
			</Card.Header>
			<Card.Content>
				<CodeBlock.Root>
					<CodeBlock.Header>
						<CodeBlock.Title>Terminal</CodeBlock.Title>
						<CodeBlock.Actions>
							<CodeBlock.CopyButton value="pnpm add ai @ai-sdk/react zod" />
						</CodeBlock.Actions>
					</CodeBlock.Header>
					<CodeBlock.Content>
						{#each command.current as line, index (index)}
							<CodeBlock.Line code={line} />
						{/each}
					</CodeBlock.Content>
				</CodeBlock.Root>
			</Card.Content>
		</Card.Root>
		<Dialog.Root>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>View route</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-xl">
				<Dialog.Header>
					<Dialog.Title>app/api/chat/route.ts</Dialog.Title>
					<Dialog.Description>The route that streams the answer.</Dialog.Description>
				</Dialog.Header>
				<CodeBlock.Root>
					<CodeBlock.Content lineNumbers>
						{#each lines.current as line, index (index)}
							<CodeBlock.Line code={line} />
						{/each}
					</CodeBlock.Content>
				</CodeBlock.Root>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</Example>
