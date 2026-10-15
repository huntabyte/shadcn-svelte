<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { Streamdown } from "svelte-streamdown";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import MarkdownCodeBlock from "$lib/components/code-block/markdown-code-block.svelte";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
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

	const script = createChat()
		.user("How do I debounce a search input in React?")
		.assistant(({ writer }) => {
			writer.text(response);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 30 });

	const chat = new Chat({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

<div class="flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
	{#each chat.messages as message (message.id)}
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
						class="space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
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
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
