<script lang="ts">
	import { Streamdown } from "svelte-streamdown";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import MarkdownCodeBlock from "$lib/components/code-block/markdown-code-block.svelte";
	import { createChat, getMessageText } from "$lib/ai.js";
	import { createScriptedChat } from "$lib/ai.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const response = `Wrap the value in a \`useDebounce\` hook. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`;

	const chat = createChat()
		.user("How do I debounce a search input in React?")
		.assistant(({ writer }) => {
			writer.text(response);
		});

	const transcript = chat.get();
	const [question] = chat.get(1);
	const transport = chat.transport({ delayMs: 30 });

	const demo = createScriptedChat({ chat, transport, initialMessages: transcript });
	const busy = $derived(demo.status === "submitted" || demo.status === "streaming");
</script>

<div class="flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
	{#each demo.messages as message (message.id)}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			<Message.Root>
				<Message.Content>
					<!-- Fenced code renders through `components.code`. Inline code uses the `codespan` snippet. -->
					<Streamdown
						content={getMessageText(message)}
						controls={false}
						components={{ code: MarkdownCodeBlock }}
					>
						{#snippet codespan({ children })}
							<code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]"
								>{@render children()}</code
							>
						{/snippet}
					</Streamdown>
				</Message.Content>
			</Message.Root>
		{/if}
	{/each}
	{#if !busy}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			onclick={() => {
				demo.setMessages([]);
				void demo.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
