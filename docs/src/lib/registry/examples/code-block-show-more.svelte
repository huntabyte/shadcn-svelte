<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const code = `"use client"

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
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`;

	const id = $props.id();

	let expanded = $state(false);

	const lines = useHighlightedCode(
		() => code,
		() => "tsx"
	);
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>components/chat.tsx</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={code} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content
			{id}
			lineNumbers
			class={expanded ? undefined : "max-h-64 scroll-fade-y overflow-y-hidden"}
		>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
		<CodeBlock.Footer class="justify-center">
			<Button
				variant="ghost"
				size="xs"
				aria-expanded={expanded}
				aria-controls={id}
				onclick={() => (expanded = !expanded)}
			>
				<ChevronDownIcon class="transition-transform in-aria-expanded:rotate-180" />
				{expanded ? "Show less" : "Show more"}
			</Button>
		</CodeBlock.Footer>
	</CodeBlock.Root>
</div>
