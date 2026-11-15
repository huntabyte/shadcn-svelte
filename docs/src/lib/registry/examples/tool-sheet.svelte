<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIDataTypes, UIMessage } from "ai";

	type ChatMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			readFile: {
				input: { path: string };
				output: { path: string; content: string };
			};
		}
	>;

	const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`;

	const script = createChat<ChatMessage>()
		.user("Which AI SDK version does this app use?")
		.assistant(({ writer }) => {
			writer
				.tool("readFile", { input: { path: "package.json" } })
				.sleep(900)
				.output({ path: "package.json", content: PACKAGE_JSON });
			writer.text("It uses ai 7 with @ai-sdk/react 4.");
		});

	const initialMessages = script.get(0);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: initialMessages, transport });
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

<div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
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
			{@const streaming = busy && message === chat.messages.at(-1)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#each message.parts as part, index (index)}
						{#if part.type === "text"}
							<p>{part.text}</p>
						{:else if part.type === "tool-readFile"}
							{#if part.state !== "output-available"}
								{@const running =
									streaming &&
									(part.state === "input-streaming" || part.state === "input-available")}
								<Trace.Root>
									<Trace.Line status={running ? "running" : "error"}>
										<Trace.Icon>
											<FileTextIcon />
										</Trace.Icon>
										<Trace.Title>
											{running ? "Reading" : "Failed to read"}
											{part.input?.path}
										</Trace.Title>
									</Trace.Line>
								</Trace.Root>
							{:else}
								<Trace.Root>
									<Sheet.Root>
										<Sheet.Trigger>
											<Trace.Line>
												<Trace.Icon>
													<FileTextIcon />
												</Trace.Icon>
												<Trace.Title>Read {part.output.path}</Trace.Title>
												<Trace.Icon>
													<ChevronRightIcon />
												</Trace.Icon>
											</Trace.Line>
										</Sheet.Trigger>
										<Sheet.Content>
											<Sheet.Header>
												<Sheet.Title class="font-mono">{part.output.path}</Sheet.Title>
												<Sheet.Description>
													{part.output.content.split("\n").length} lines
												</Sheet.Description>
											</Sheet.Header>
											<CodeBlock.Root class="mx-6 mb-6 w-auto">
												<CodeBlock.Content lineNumbers code={part.output.content} />
											</CodeBlock.Root>
										</Sheet.Content>
									</Sheet.Root>
								</Trace.Root>
							{/if}
						{/if}
					{/each}
				</Message.Content>
			</Message.Root>
		{/if}
	{/each}
	{#if !busy}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			onclick={() =>
				nextMessage ? void chat.sendMessage(nextMessage) : (chat.messages = initialMessages)}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
