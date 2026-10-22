<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
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

	const chat = `"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) =>
            part.type === "text" ? <p key={index}>{part.text}</p> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask anything" />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`;

	const files = [
		{ id: "route", title: "app/api/chat/route.ts", language: "ts", code: source },
		{ id: "chat", title: "components/chat.tsx", language: "tsx", code: chat },
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

<Example title="Tabs">
	<Tabs.Root value="route">
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
</Example>
