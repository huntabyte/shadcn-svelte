<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	const files = [
		{
			id: "route",
			title: "app/api/chat/route.ts",
			language: "ts",
			code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`,
		},
		{
			id: "chat",
			title: "components/chat.tsx",
			language: "tsx",
			code: `"use client"

import { useChat } from "@ai-sdk/react"

export function Chat() {
  const { messages } = useChat()

  return <MessageList messages={messages} />
}`,
		},
		{
			id: "env",
			title: ".env.local",
			language: "bash",
			code: "AI_GATEWAY_API_KEY=your-api-key",
		},
	];

	const lines = files.map((file) =>
		useHighlightedCode(
			() => file.code,
			() => file.language
		)
	);
</script>

<Tabs.Root value="route" class="w-full max-w-md">
	<Tabs.List>
		{#each files as file (file.id)}
			<Tabs.Trigger value={file.id}>{file.title.split("/").at(-1)}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each files as file, fileIndex (file.id)}
		<Tabs.Content value={file.id}>
			<CodeBlock.Root>
				<CodeBlock.Header>
					<CodeBlock.Title>{file.title}</CodeBlock.Title>
					<CodeBlock.Actions>
						<CodeBlock.CopyButton value={file.code} />
					</CodeBlock.Actions>
				</CodeBlock.Header>
				<CodeBlock.Content lineNumbers>
					{#each lines[fileIndex].current as line, index (index)}
						<CodeBlock.Line code={line} />
					{/each}
				</CodeBlock.Content>
			</CodeBlock.Root>
		</Tabs.Content>
	{/each}
</Tabs.Root>
