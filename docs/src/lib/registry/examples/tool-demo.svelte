<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Chat } from "@ai-sdk/svelte";
	import { untrack } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIDataTypes, UIMessage } from "ai";

	type ChatMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			runCommand: {
				input: { command: string };
				output: { stdout: string };
			};
		}
	>;

	type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-runCommand" }>;

	const script = createChat<ChatMessage>()
		.user("Which package managers are installed?")
		.assistant(({ writer }) => {
			writer
				.tool("runCommand", { input: { command: "node --version" } })
				.sleep(900)
				.output({ stdout: "v24.18.0" });
			writer
				.tool("runCommand", { input: { command: "npm --version" } })
				.sleep(900)
				.output({ stdout: "11.6.2" });
			writer
				.tool("runCommand", { input: { command: "pnpm --version" } })
				.sleep(900)
				.error("command not found: pnpm");
			writer.text("Node 24 and npm 11 are installed. pnpm is not.");
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

{#snippet toolRow(part: ToolPart, streaming: boolean, defaultOpen?: boolean)}
	{@const command = part.input?.command}
	{#if part.state === "output-available" || part.state === "output-error"}
		{@const failed = part.state === "output-error"}
		<Trace.Collapsible open={defaultOpen}>
			<Trace.CollapsibleTrigger>
				<Trace.Line status={failed ? "error" : undefined}>
					<Trace.Icon>
						<TerminalIcon />
					</Trace.Icon>
					<Trace.Title>
						{failed ? "Failed to run" : "Ran"}
						{command}
					</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content
						wrap
						class="max-h-64"
						code={failed ? part.errorText : part.output.stdout}
					/>
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{:else}
		<Trace.Line status={streaming ? "running" : "error"}>
			<Trace.Icon>
				<TerminalIcon />
			</Trace.Icon>
			<Trace.Title>
				{streaming ? "Running" : "Failed to run"}
				{command}
			</Trace.Title>
		</Trace.Line>
	{/if}
{/snippet}

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
			{@const tools = message.parts.filter((part) => part.type === "tool-runCommand")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if tools.length > 0}
						<Trace.Root>
							{#each tools as part (part.toolCallId)}
								<!-- Like `defaultOpen`: read once, when the row first renders. -->
								{@render toolRow(
									part,
									streaming,
									untrack(() => (busy ? undefined : part.state === "output-error"))
								)}
							{/each}
						</Trace.Root>
					{/if}
					{#if text}
						<p>{text}</p>
					{/if}
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
