<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
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

	type Part = ChatMessage["parts"][number];
	type ToolPart = Extract<Part, { type: "tool-runCommand" }>;
	type SourcePart = Extract<Part, { type: "source-url" }>;

	const script = createChat<ChatMessage>()
		.user("Why does pnpm install fail in CI?")
		.assistant(({ writer }) => {
			writer.reasoning(
				"CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
				{ delayMs: 40 }
			);
			writer
				.tool("runCommand", { input: { command: "pnpm --version" } })
				.sleep(700)
				.output({ stdout: "10.18.0" });
			writer
				.tool("runCommand", {
					input: {
						command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
					},
				})
				.sleep(900)
				.output({
					stdout: " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
				});
			writer
				.tool("runCommand", {
					input: { command: "pnpm install --frozen-lockfile" },
				})
				.sleep(1200)
				.error(
					'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
				);
			writer.sourceUrl({
				url: "https://pnpm.io/cli/install#--frozen-lockfile",
				title: "pnpm install | pnpm.io",
			});
			writer.sourceUrl({
				url: "https://pnpm.io/continuous-integration",
				title: "Continuous Integration | pnpm.io",
			});
			writer.sleep(1000);
			writer.text(
				"The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	// The reader's choice for each thinking row. Until they click, it follows `running`.
	let thinkingOpen = $state<Record<string, boolean>>({});
</script>

{#snippet thinkingLine(running: boolean)}
	<Trace.Line status={running ? "running" : undefined}>
		<Trace.Icon>
			{#if running}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				<CircleCheckIcon />
			{/if}
		</Trace.Icon>
		<Trace.Title>{running ? "Thinking" : "Thought for 5s"}</Trace.Title>
	</Trace.Line>
{/snippet}

{#snippet thinkingRow(id: string, text: string, running: boolean)}
	{#if text.length === 0}
		{@render thinkingLine(running)}
	{:else}
		<Trace.Collapsible
			open={thinkingOpen[id] ?? running}
			onOpenChange={(open) => (thinkingOpen[id] = open)}
		>
			<Trace.CollapsibleTrigger>{@render thinkingLine(running)}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{text}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

{#snippet toolRow(part: ToolPart, streaming: boolean, defaultOpen?: boolean)}
	{@const command = part.input?.command}
	{#if part.state === "output-available" || part.state === "output-error"}
		{@const failed = part.state === "output-error"}
		<Trace.Collapsible open={defaultOpen}>
			<Trace.CollapsibleTrigger>
				<Trace.Line status={failed ? "error" : undefined}>
					<Trace.Icon>
						{#if failed}
							<CircleAlertIcon />
						{:else}
							<CircleCheckIcon />
						{/if}
					</Trace.Icon>
					<Trace.Title>
						{failed ? "Failed to run" : "Ran"}
						{command}
					</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				{#if failed}
					<CodeBlock.Root size="sm" variant="destructive">
						<CodeBlock.Content wrap class="max-h-64" code={part.errorText} />
					</CodeBlock.Root>
				{:else}
					<CodeBlock.Root size="sm">
						<CodeBlock.Content wrap class="max-h-64" code={part.output.stdout} />
					</CodeBlock.Root>
				{/if}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{:else}
		<Trace.Line status={streaming ? "running" : "error"}>
			<Trace.Icon>
				{#if streaming}
					<LoaderCircleIcon class="animate-spin" />
				{:else}
					<CircleAlertIcon />
				{/if}
			</Trace.Icon>
			<Trace.Title>
				{streaming ? "Running" : "Failed to run"}
				{command}
			</Trace.Title>
		</Trace.Line>
	{/if}
{/snippet}

{#snippet sourcesRow(sources: SourcePart[], running: boolean)}
	<Trace.Collapsible>
		<Trace.CollapsibleTrigger>
			<Trace.Line status={running ? "running" : undefined}>
				<Trace.Icon>
					{#if running}
						<LoaderCircleIcon class="animate-spin" />
					{:else}
						<GlobeIcon />
					{/if}
				</Trace.Icon>
				<Trace.Title>
					{running ? "Using" : "Used"}
					{sources.length} sources
				</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each sources as source (source.sourceId)}
					<a href={source.url} target="_blank" rel="noreferrer">
						<Trace.Line>
							<Trace.Icon>
								<GlobeIcon />
							</Trace.Icon>
							<Trace.Title>
								{source.title ?? new URL(source.url).hostname}
								<span class="sr-only"> (opens in a new tab)</span>
							</Trace.Title>
							<Trace.Icon>
								<ArrowUpRightIcon />
							</Trace.Icon>
						</Trace.Line>
					</a>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
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
			{@const rows = message.parts.filter(
				(part) => part.type === "reasoning" || part.type === "tool-runCommand"
			)}
			{@const sources = message.parts.filter((part) => part.type === "source-url")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if rows.length + sources.length > 0}
						<Trace.Root>
							{#each rows as part, index (part.type === "tool-runCommand" ? part.toolCallId : index)}
								{#if part.type === "reasoning"}
									{@render thinkingRow(
										`${message.id}-${index}`,
										part.text,
										streaming && part.state === "streaming"
									)}
								{:else if part.type === "tool-runCommand"}
									<!-- Like `defaultOpen`: read once, when the row first renders. -->
									{@render toolRow(
										part,
										streaming,
										untrack(() => index === 2)
									)}
								{/if}
							{/each}
							{#if sources.length > 0}
								{@render sourcesRow(sources, streaming && text.length === 0)}
							{/if}
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
				thinkingOpen = {};
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
