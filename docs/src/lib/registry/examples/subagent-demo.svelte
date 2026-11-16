<script lang="ts">
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { ChatTransport, UIDataTypes, UIMessage, UIMessageChunk } from "ai";

	type SubagentMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			runCommand: {
				input: { command: string };
				output: { stdout: string };
			};
		}
	>;

	type SubagentPart = SubagentMessage["parts"][number];

	type ChatMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			researchAgent: {
				input: { task: string };
				output: SubagentMessage;
			};
		}
	>;

	type Part = ChatMessage["parts"][number];

	const steps = [
		{
			command: "grep -rn cacheKey scripts",
			stdout: "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
		},
		{
			command: "sed -n 13,15p scripts/optimize-images.ts",
			stdout:
				'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
		},
		{
			command: "ls public/images | wc -l",
			stdout: "1240",
		},
	];

	function getSubagentMessage(
		done: number,
		report?: string,
		preliminary?: boolean
	): SubagentMessage {
		const parts = steps.slice(0, done).map(
			(step, index): SubagentPart => ({
				type: "tool-runCommand",
				toolCallId: `step-${index}`,
				state: "output-available",
				input: { command: step.command },
				output: { stdout: step.stdout },
			})
		);

		if (done < steps.length) {
			parts.push({
				type: "tool-runCommand",
				toolCallId: `step-${done}`,
				state: "input-available",
				input: { command: steps[done].command },
			});
		}

		if (report) {
			parts.push({ type: "text", text: report });
		}

		return {
			id: "research-agent",
			role: "assistant",
			parts,
			...(preliminary ? { metadata: { preliminary } } : {}),
		};
	}

	const script = createChat<ChatMessage>()
		.user("Why does image optimization rerun on every deploy?")
		.assistant(({ writer }) => {
			const subagent = writer
				.tool("researchAgent", {
					input: {
						task: "Find out why image optimization reruns on every deploy.",
					},
				})
				.sleep(600);
			steps.forEach((_, index) => {
				subagent.output(getSubagentMessage(index, undefined, true)).sleep(1000);
			});
			subagent
				.output(
					getSubagentMessage(
						steps.length,
						"The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again."
					)
				)
				.sleep(400);
			writer.text(
				"Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const scriptTransport = script.transport({ delayMs: 20 });

	// `@shadcn/helpers` 0.2.0 has no `output(..., { preliminary: true })`, so the
	// script tags preliminary outputs in their metadata and this transport moves
	// the tag onto the chunk, as a real `execute` that yields would stream it.
	function markPreliminary(chunk: UIMessageChunk): UIMessageChunk {
		if (chunk.type !== "tool-output-available") {
			return chunk;
		}
		const output = chunk.output as SubagentMessage | undefined;
		const metadata = output?.metadata as { preliminary?: boolean } | undefined;
		if (!output || !metadata?.preliminary) {
			return chunk;
		}
		const { metadata: _metadata, ...message } = output;
		return { ...chunk, output: message, preliminary: true };
	}

	const transport: ChatTransport<ChatMessage> = {
		async sendMessages(options) {
			const stream = await scriptTransport.sendMessages(options);
			return stream.pipeThrough(
				new TransformStream<UIMessageChunk, UIMessageChunk>({
					transform(chunk, controller) {
						controller.enqueue(markPreliminary(chunk));
					},
				})
			);
		},
		reconnectToStream: (options) => scriptTransport.reconnectToStream(options),
	};

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

{#snippet stepRow(part: Extract<SubagentPart, { type: "tool-runCommand" }>, running: boolean)}
	{@const command = part.input?.command}
	{#if part.state === "output-available"}
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>
						<CircleCheckIcon />
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
		<Trace.Line status={running ? "running" : "error"}>
			<Trace.Icon>
				{#if running}
					<LoaderCircleIcon class="animate-spin" />
				{:else}
					<CircleAlertIcon />
				{/if}
			</Trace.Icon>
			<Trace.Title>
				{running ? "Running" : "Failed to run"}
				{command}
			</Trace.Title>
		</Trace.Line>
	{/if}
{/snippet}

{#snippet subagentLine(done: boolean, running: boolean)}
	<Trace.Line status={done ? undefined : running ? "running" : "error"}>
		<Trace.Icon>
			{#if done}
				<CircleCheckIcon />
			{:else if running}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				<CircleAlertIcon />
			{/if}
		</Trace.Icon>
		<Trace.Title>
			{done ? "Ran" : running ? "Running" : "Failed to run"} the research subagent
		</Trace.Title>
	</Trace.Line>
{/snippet}

{#snippet subagentRow(part: Extract<Part, { type: "tool-researchAgent" }>, streaming: boolean)}
	{@const done = part.state === "output-available" && !part.preliminary}
	{@const running = !done && part.state !== "output-error" && streaming}
	{@const parts = part.state === "output-available" ? part.output.parts : []}
	{@const report = parts
		.map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
		.join("")}
	{#if parts.length === 0}
		{@render subagentLine(done, running)}
	{:else}
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				{@render subagentLine(done, running)}
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="flex flex-col gap-3">
				<Trace.Root>
					{#each parts.filter((agentPart) => agentPart.type === "tool-runCommand") as agentPart (agentPart.toolCallId)}
						{@render stepRow(agentPart, running)}
					{/each}
				</Trace.Root>
				{#if report}
					<p>{report}</p>
				{/if}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
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
			{@const agents = message.parts.filter((part) => part.type === "tool-researchAgent")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if agents.length > 0}
						<Trace.Root>
							{#each agents as part (part.toolCallId)}
								{@render subagentRow(part, streaming)}
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
