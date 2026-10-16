<script lang="ts">
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Chat } from "@ai-sdk/svelte";
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

	const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`;

	const script = createChat<ChatMessage>()
		.user("Reset the database and seed it.")
		.assistant(({ writer }) => {
			writer
				.tool("runCommand", {
					input: { command: "pnpm prisma migrate reset --skip-seed" },
				})
				.sleep(900)
				.output({
					stdout: `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`,
				});
			writer
				.tool("runCommand", { input: { command: "pnpm prisma db seed" } })
				.sleep(1200)
				.error(STACK);
			writer.text(
				"The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	function parseFrame(line: string) {
		const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);

		return {
			line,
			name: match?.[1],
			file: match?.[2],
			lineNumber: match?.[3],
			internal: line.includes("node_modules") || line.includes("node:"),
		};
	}

	function parseStack(stack: string) {
		const [error, ...lines] = stack.split("\n").map((line) => line.trim());
		const frames = lines.map(parseFrame);

		return {
			error,
			appFrames: frames.filter((frame) => !frame.internal),
			internalFrames: frames.filter((frame) => frame.internal),
		};
	}
</script>

{#snippet stackTrace(stack: string)}
	{@const { error, appFrames, internalFrames } = parseStack(stack)}
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="error">
				<Trace.Icon>
					<TerminalIcon />
				</Trace.Icon>
				<Trace.Title>Failed: {error}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="flex flex-col gap-2">
			<p class="font-mono text-xs text-destructive">{error}</p>
			<Trace.Root>
				{#each appFrames as frame, index (index)}
					<a href="#{frame.file}:{frame.lineNumber}">
						<Trace.Line>
							<Trace.Icon>
								<FileCodeIcon />
							</Trace.Icon>
							<Trace.Title>
								{frame.name} in {frame.file}:{frame.lineNumber}
							</Trace.Title>
						</Trace.Line>
					</a>
				{/each}
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line>
							<Trace.Icon>
								<LayersIcon />
							</Trace.Icon>
							<Trace.Title>
								{internalFrames.length} framework frames
							</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						<ol
							class="flex flex-col gap-1 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs"
						>
							{#each internalFrames as frame, index (index)}
								<li class="whitespace-nowrap">
									{frame.line}
								</li>
							{/each}
						</ol>
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
{/snippet}

{#snippet commandRow(part: ToolPart, streaming: boolean)}
	{@const command = part.input?.command}
	{#if part.state === "output-error"}
		{@render stackTrace(part.errorText)}
	{:else if part.state === "output-available"}
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>
						<TerminalIcon />
					</Trace.Icon>
					<Trace.Title>Ran {command}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={part.output.stdout} />
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
								{@render commandRow(part, streaming)}
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
