<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { DynamicToolUIPart, UIMessage } from "ai";

	const script = createChat()
		.user("Which package managers are installed?")
		.assistant(({ writer }) => {
			writer
				.tool("runCommand", {
					dynamic: true,
					input: { command: "node --version" },
				})
				.sleep(900)
				.output({ stdout: "v24.18.0" });
			writer
				.tool("runCommand", {
					dynamic: true,
					input: { command: "npm --version" },
				})
				.sleep(900)
				.output({ stdout: "11.6.2" });
			writer
				.tool("runCommand", {
					dynamic: true,
					input: { command: "pnpm --version" },
				})
				.sleep(900)
				.error("command not found: pnpm");
			writer.text("Node 24 and npm 11 are installed. pnpm is not.");
		});

	const initialMessages = script.get(0);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat({ messages: initialMessages, transport });
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	function groupParts(parts: UIMessage["parts"]) {
		const runs: { trace: boolean; parts: UIMessage["parts"] }[] = [];

		for (const part of parts) {
			const trace = part.type === "dynamic-tool";

			if (!trace && part.type !== "text") {
				continue;
			}

			const last = runs.at(-1);

			if (last?.trace === trace) {
				last.parts.push(part);
			} else {
				runs.push({ trace, parts: [part] });
			}
		}

		return runs;
	}
</script>

{#snippet toolTrace(part: DynamicToolUIPart, live: boolean)}
	{@const command = (part.input as { command?: string } | undefined)?.command}
	{#if part.state === "output-available" || part.state === "output-error"}
		{@const failed = part.state === "output-error"}
		<Trace.Collapsible>
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
						code={failed ? part.errorText : (part.output as { stdout: string }).stdout}
					/>
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{:else if part.state === "output-denied"}
		<Trace.Line>
			<Trace.Icon>
				<TerminalIcon />
			</Trace.Icon>
			<Trace.Title>Denied {command}</Trace.Title>
		</Trace.Line>
	{:else}
		<Trace.Line status={live ? "running" : "error"}>
			<Trace.Icon>
				<TerminalIcon />
			</Trace.Icon>
			<Trace.Title>
				{live ? "Running" : "Failed to run"}
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
			{@const live = chat.status === "streaming" && message === chat.messages.at(-1)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#each groupParts(message.parts) as run, runIndex (runIndex)}
						{#if run.trace}
							<Trace.Root>
								{#each run.parts as part, index (part.type === "dynamic-tool" ? part.toolCallId : index)}
									{#if part.type === "dynamic-tool"}
										{@render toolTrace(part, live)}
									{/if}
								{/each}
							</Trace.Root>
						{:else}
							{#each run.parts as part, index (`${runIndex}-${index}`)}
								{#if part.type === "text"}
									<p>{part.text}</p>
								{/if}
							{/each}
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
			onclick={() => {
				if (nextMessage) {
					void chat.sendMessage(nextMessage);
				} else {
					chat.messages = initialMessages;
				}
			}}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
