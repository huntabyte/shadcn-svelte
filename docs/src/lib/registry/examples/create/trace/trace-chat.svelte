<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import {
		isToolUIPart,
		lastAssistantMessageIsCompleteWithApprovalResponses,
		type UIDataTypes,
		type UIMessage,
	} from "ai";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import type { Snippet } from "svelte";

	type ChatbotMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			getWeather: {
				input: { city: string };
				output: { location: string; temperature: number; condition: string };
			};
			searchWikipedia: {
				input: { query: string };
				output: { results: { title: string; url: string }[] };
			};
			fetchPage: {
				input: { url: string };
				output: { status: number; title: string; excerpt: string };
			};
			readFile: {
				input: { path: string };
				output: { path: string; content: string };
			};
			runCommand: {
				input: { command: string };
				output: { stdout: string };
			};
		}
	>;

	type ChatbotPart = ChatbotMessage["parts"][number];

	type ReasoningPart = Extract<ChatbotPart, { type: "reasoning" }>;

	type ToolPart = Extract<ChatbotPart, { toolCallId: string }>;

	type ToolTitle = {
		running: string;
		done: string;
		failed: string;
		denied?: string;
	};

	const README = `# Acme Chat

A chat app built with Next.js and the AI SDK.

## Getting started

pnpm install
pnpm dev

## Chat route

app/api/chat/route.ts streams responses through the AI Gateway.
Set AI_GATEWAY_API_KEY in .env.local.`;

	const script = createChat<ChatbotMessage>()
		.user("What's the weather in Lisbon and Tokyo?")
		.sleep(800)
		.assistant(({ writer }) => {
			writer.reasoning(
				"The user wants the weather in two cities. I'll look both up at once, then compare them in a sentence."
			);
			writer
				.tool("getWeather", { input: { city: "Lisbon" } })
				.sleep(1200)
				.output({
					location: "Lisbon, Portugal",
					temperature: 18,
					condition: "Mainly clear",
				});
			writer
				.tool("getWeather", { input: { city: "Tokyo" } })
				.sleep(600)
				.output({
					location: "Tokyo, Japan",
					temperature: 26,
					condition: "Clear sky",
				});
			writer.text("Lisbon is 18°C and mainly clear. Tokyo is warmer at 26°C under a clear sky.");
		})
		.user("Search Wikipedia for the Voyager probes and summarise with sources.")
		.sleep(800)
		.assistant(({ writer }) => {
			writer.reasoning(
				"Start with a Wikipedia search. The Voyager 1 article should say where the probe is now."
			);
			writer
				.tool("searchWikipedia", { input: { query: "Voyager probes" } })
				.sleep(1000)
				.output({
					results: [
						{
							title: "Voyager program",
							url: "https://en.wikipedia.org/wiki/Voyager_program",
						},
						{
							title: "Voyager 1",
							url: "https://en.wikipedia.org/wiki/Voyager_1",
						},
						{
							title: "Voyager 2",
							url: "https://en.wikipedia.org/wiki/Voyager_2",
						},
					],
				});
			writer
				.tool("fetchPage", {
					input: { url: "https://en.wikipedia.org/wiki/Voyager_1" },
				})
				.sleep(900)
				.output({
					status: 200,
					title: "Voyager 1 - Wikipedia",
					excerpt:
						"Voyager 1 is a space probe launched by NASA on September 5, 1977. It is the most distant human-made object from Earth.",
				});
			writer.text(
				"NASA launched both Voyager probes in 1977 to study the outer planets. Both have since reached interstellar space, and Voyager 1 is the most distant human-made object from Earth."
			);
			writer.sourceUrl({
				url: "https://en.wikipedia.org/wiki/Voyager_program",
				title: "Voyager program",
			});
			writer.sourceUrl({
				url: "https://en.wikipedia.org/wiki/Voyager_1",
				title: "Voyager 1",
			});
		})
		.user("Read the README and the changelog, then check the Node version.")
		.sleep(800)
		.assistant(({ writer }) => {
			writer.reasoning("Read both files first. Running a command needs the user's approval.");
			writer
				.tool("readFile", { input: { path: "README.md" } })
				.sleep(700)
				.output({ path: "README.md", content: README });
			writer
				.tool("readFile", { input: { path: "CHANGELOG.md" } })
				.sleep(500)
				.error("ENOENT: no such file or directory, open 'CHANGELOG.md'");
			writer.tool("runCommand", {
				input: { command: "node --version" },
				needsApproval: true,
				output: { stdout: "v24.18.0" },
			});
		})
		.assistant(({ writer, toolCall }) => {
			writer.text(
				toolCall?.approved
					? "The README covers setup and the chat route. There is no changelog. The project runs on Node v24.18.0."
					: "The README covers setup and the chat route. There is no changelog. I didn't run the command."
			);
		});

	const initialMessages = script.get(0);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatbotMessage>({
		messages: initialMessages,
		transport,
		sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
	});
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
	const lastMessage = $derived(chat.messages.at(-1));

	// The reader's choice for each reasoning row. Until they click, it follows `running`.
	let reasoningOpen = $state<Record<string, boolean>>({});

	function handleClick() {
		if (nextMessage) {
			void chat.sendMessage(nextMessage);
			return;
		}

		reasoningOpen = {};
		chat.messages = initialMessages;
	}

	// Each run of reasoning and tool parts becomes one group. A text part or a
	// pending approval ends the run. Sources are shown once at the end.
	function groupParts(parts: ChatbotPart[]) {
		const runs: (
			| { type: "text"; key: string; text: string }
			| { type: "approval"; key: string; part: ToolPart }
			| { type: "activity"; key: string; parts: (ReasoningPart | ToolPart)[] }
		)[] = [];
		const sources: Extract<ChatbotPart, { type: "source-url" }>[] = [];

		parts.forEach((part, index) => {
			const last = runs.at(-1);

			if (part.type === "source-url") {
				if (!sources.some((source) => source.url === part.url)) {
					sources.push(part);
				}
				return;
			}

			if (part.type === "text") {
				if (last?.type === "text") {
					last.text += part.text;
				} else if (part.text.trim()) {
					runs.push({ type: "text", key: `text-${index}`, text: part.text });
				}
				return;
			}

			if (isToolUIPart(part) && part.state === "approval-requested") {
				runs.push({ type: "approval", key: part.toolCallId, part });
				return;
			}

			if (part.type === "reasoning" || isToolUIPart(part)) {
				if (last?.type === "activity") {
					last.parts.push(part);
				} else {
					runs.push({ type: "activity", key: `activity-${index}`, parts: [part] });
				}
			}
		});

		return { runs, sources };
	}
</script>

{#snippet chevronRightGlyph()}
	<IconPlaceholder
		lucide="ChevronRightIcon"
		tabler="IconChevronRight"
		hugeicons="ArrowRight01Icon"
		phosphor="CaretRightIcon"
		remixicon="RiArrowRightSLine"
	/>
{/snippet}

{#snippet arrowUpRightGlyph()}
	<IconPlaceholder
		lucide="ArrowUpRightIcon"
		tabler="IconArrowUpRight"
		hugeicons="ArrowUpRight01Icon"
		phosphor="ArrowUpRightIcon"
		remixicon="RiArrowRightUpLine"
	/>
{/snippet}

{#snippet brainGlyph()}
	<IconPlaceholder
		lucide="BrainIcon"
		tabler="IconBrain"
		hugeicons="AiBrainIcon"
		phosphor="BrainIcon"
		remixicon="RiBrainLine"
	/>
{/snippet}

{#snippet fileGlyph()}
	<IconPlaceholder
		lucide="FileTextIcon"
		tabler="IconFileText"
		hugeicons="File02Icon"
		phosphor="FileTextIcon"
		remixicon="RiFileTextLine"
	/>
{/snippet}

{#snippet terminalGlyph()}
	<IconPlaceholder
		lucide="TerminalIcon"
		tabler="IconTerminal"
		hugeicons="ComputerTerminal01Icon"
		phosphor="TerminalIcon"
		remixicon="RiTerminalBoxLine"
	/>
{/snippet}

{#snippet sunGlyph()}
	<IconPlaceholder
		lucide="SunIcon"
		tabler="IconSun"
		hugeicons="Sun03Icon"
		phosphor="SunIcon"
		remixicon="RiSunLine"
	/>
{/snippet}

{#snippet bookGlyph()}
	<IconPlaceholder
		lucide="BookOpenIcon"
		tabler="IconBook"
		hugeicons="BookOpen02Icon"
		phosphor="BookOpenIcon"
		remixicon="RiBookOpenLine"
	/>
{/snippet}

{#snippet linkGlyph()}
	<IconPlaceholder
		lucide="LinkIcon"
		tabler="IconLink"
		hugeicons="LinkIcon"
		phosphor="LinkIcon"
		remixicon="RiLinksLine"
	/>
{/snippet}

{#snippet globeGlyph()}
	<IconPlaceholder
		lucide="GlobeIcon"
		tabler="IconGlobe"
		hugeicons="Globe02Icon"
		phosphor="GlobeIcon"
		remixicon="RiGlobeLine"
	/>
{/snippet}

<!-- Static when there is nothing to show, expandable otherwise. -->
{#snippet activityRow(
	status: Trace.TraceLineStatus | undefined,
	icon: Snippet,
	title: string,
	children?: Snippet
)}
	{#if !children}
		<Trace.Line {status}>
			<Trace.Icon>{@render icon()}</Trace.Icon>
			<Trace.Title>{title}</Trace.Title>
		</Trace.Line>
	{:else}
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line {status}>
					<Trace.Icon>{@render icon()}</Trace.Icon>
					<Trace.Title>{title}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>{@render children()}</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

{#snippet reasoningActivity(id: string, part: ReasoningPart, isStreaming: boolean)}
	{@const running = isStreaming && part.state === "streaming"}
	{@const text = part.text.trim()}
	{#if !text}
		{@render activityRow(
			running ? "running" : undefined,
			brainGlyph,
			running ? "Thinking" : "Thought"
		)}
	{:else}
		<Trace.Collapsible
			open={reasoningOpen[id] ?? running}
			onOpenChange={(open) => (reasoningOpen[id] = open)}
		>
			<Trace.CollapsibleTrigger>
				<Trace.Line status={running ? "running" : undefined}>
					<Trace.Icon>{@render brainGlyph()}</Trace.Icon>
					<Trace.Title>{running ? "Thinking" : "Thought"}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{text}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

<!-- Maps a tool part's state to a row. `children` is what the finished row expands to show. -->
{#snippet toolRow(
	part: ToolPart,
	isStreaming: boolean,
	icon: Snippet,
	title: ToolTitle,
	children?: Snippet
)}
	{@const running = isStreaming ? "running" : undefined}
	{@const denied = title.denied ?? `Denied: ${title.running}`}
	{#if part.state === "input-streaming" || part.state === "input-available"}
		{@render activityRow(running, icon, title.running)}
	{:else if part.state === "approval-requested"}
		<!-- A pending approval renders outside Trace, as toolApproval. -->
	{:else if part.state === "approval-responded"}
		{#if part.approval.approved}
			{@render activityRow(running, icon, title.running)}
		{:else}
			{@render activityRow(undefined, icon, denied)}
		{/if}
	{:else if part.state === "output-denied"}
		{@render activityRow(undefined, icon, denied)}
	{:else if part.state === "output-error"}
		{@const errorText = part.errorText}
		{#snippet error()}
			<CodeBlock.Root size="sm" variant="destructive">
				<CodeBlock.Content wrap class="max-h-64" code={errorText} />
			</CodeBlock.Root>
		{/snippet}
		{@render activityRow("error", icon, title.failed, error)}
	{:else if part.state === "output-available"}
		{@render activityRow(undefined, icon, title.done, children)}
	{/if}
{/snippet}

{#snippet toolActivity(part: ToolPart, isStreaming: boolean)}
	{#if part.type === "tool-getWeather"}
		{@const city = part.input?.city}
		{#snippet weather()}
			{#if part.type === "tool-getWeather" && part.state === "output-available"}
				{@render toolInputOutput(
					part.input,
					`${part.output.location}\n${part.output.temperature}°C, ${part.output.condition}`
				)}
			{/if}
		{/snippet}
		{@render toolRow(
			part,
			isStreaming,
			sunGlyph,
			{
				running: `Getting weather for ${city}`,
				done: `Got weather for ${city}`,
				failed: `Couldn't get weather for ${city}`,
			},
			weather
		)}
	{:else if part.type === "tool-searchWikipedia"}
		{@const query = part.input?.query}
		{#snippet results()}
			{#if part.type === "tool-searchWikipedia" && part.state === "output-available"}
				<Trace.Root>
					{#each part.output.results as result, index (index)}
						{@render linkActivity(result.url, result.title)}
					{/each}
				</Trace.Root>
			{/if}
		{/snippet}
		{@render toolRow(
			part,
			isStreaming,
			bookGlyph,
			{
				running: `Searching Wikipedia for “${query}”`,
				done: `Searched Wikipedia for “${query}”`,
				failed: `Couldn't search Wikipedia for “${query}”`,
			},
			results
		)}
	{:else if part.type === "tool-fetchPage"}
		{@const url = part.input?.url?.replace(/^https?:\/\//, "")}
		{#snippet page()}
			{#if part.type === "tool-fetchPage" && part.state === "output-available"}
				{@render toolInputOutput(
					part.input,
					`HTTP ${part.output.status} · ${part.output.title}\n\n${part.output.excerpt}`
				)}
			{/if}
		{/snippet}
		{@render toolRow(
			part,
			isStreaming,
			globeGlyph,
			{
				running: `Fetching ${url}`,
				done: `Fetched ${url}`,
				failed: `Couldn't fetch ${url}`,
			},
			page
		)}
	{:else if part.type === "tool-readFile"}
		{#if part.state === "output-available"}
			{@render fileActivity(part.output.path, part.output.content)}
		{:else}
			{@const path = part.input?.path}
			{@render toolRow(part, isStreaming, fileGlyph, {
				running: `Reading ${path}`,
				done: `Read ${path}`,
				failed: `Couldn't read ${path}`,
			})}
		{/if}
	{:else if part.type === "tool-runCommand"}
		{@const command = part.input?.command}
		{#snippet stdout()}
			{#if part.type === "tool-runCommand" && part.state === "output-available"}
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={part.output.stdout} />
				</CodeBlock.Root>
			{/if}
		{/snippet}
		{@render toolRow(
			part,
			isStreaming,
			terminalGlyph,
			{
				running: `Running ${command}`,
				done: `Ran ${command}`,
				failed: `Couldn't run ${command}`,
				denied: `Denied ${command}`,
			},
			stdout
		)}
	{/if}
{/snippet}

<!-- A pending approval is a prompt, not activity, so it is an Item. Once answered, the tool part renders as a Trace row again. -->
{#snippet toolApproval(part: ToolPart)}
	{#if part.state === "approval-requested" && part.type === "tool-runCommand"}
		{@const id = part.approval.id}
		<Item.Root variant="outline" size="sm">
			<Item.Media variant="icon">{@render terminalGlyph()}</Item.Media>
			<Item.Content>
				<Item.Title>Run {part.input.command}?</Item.Title>
				<Item.Description>The command runs in this project.</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button
					size="sm"
					variant="outline"
					onclick={() => void chat.addToolApprovalResponse({ id, approved: false })}
				>
					Deny
				</Button>
				<Button size="sm" onclick={() => void chat.addToolApprovalResponse({ id, approved: true })}>
					Approve
				</Button>
			</Item.Actions>
		</Item.Root>
	{/if}
{/snippet}

{#snippet linkActivity(href: string, title: string)}
	<a {href} target="_blank" rel="noreferrer">
		<Trace.Line>
			<Trace.Icon>{@render globeGlyph()}</Trace.Icon>
			<Trace.Title>
				{title}
				<span class="sr-only"> (opens in a new tab)</span>
			</Trace.Title>
			<Trace.Icon>{@render arrowUpRightGlyph()}</Trace.Icon>
		</Trace.Line>
	</a>
{/snippet}

{#snippet fileActivity(path: string, content: string)}
	<Sheet.Root>
		<Sheet.Trigger>
			<Trace.Line>
				<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
				<Trace.Title>Read {path}</Trace.Title>
				<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
			</Trace.Line>
		</Sheet.Trigger>
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title class="font-mono">{path}</Sheet.Title>
				<Sheet.Description>{content.split("\n").length} lines</Sheet.Description>
			</Sheet.Header>
			<CodeBlock.Root class="mx-4 mb-4 min-h-0 w-auto flex-1">
				<CodeBlock.Content wrap code={content} />
			</CodeBlock.Root>
		</Sheet.Content>
	</Sheet.Root>
{/snippet}

{#snippet toolInputOutput(input: unknown, output: string)}
	<div class="flex flex-col gap-2">
		<CodeBlock.Root size="sm">
			<CodeBlock.Header>
				<CodeBlock.Title>Input</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content wrap class="max-h-64" code={JSON.stringify(input)} />
		</CodeBlock.Root>
		<CodeBlock.Root size="sm">
			<CodeBlock.Header>
				<CodeBlock.Title>Output</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content wrap class="max-h-64" code={output} />
		</CodeBlock.Root>
	</div>
{/snippet}

{#snippet chatbotMessageItem(message: ChatbotMessage, isStreaming: boolean)}
	{#if message.role === "user"}
		<Message.Root align="end">
			<Message.Content>
				<Bubble.Root align="end" variant="muted">
					<Bubble.Content>{getMessageText(message)}</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	{:else}
		{@const { runs, sources } = groupParts(message.parts)}
		<Message.Root align="start">
			<Message.Content class="gap-3">
				{#each runs as run (run.key)}
					{#if run.type === "text"}
						<p class="leading-relaxed">{run.text}</p>
					{:else if run.type === "approval"}
						{@render toolApproval(run.part)}
					{:else}
						<Trace.Root>
							{#each run.parts as part, index (part.type === "reasoning" ? `reasoning-${index}` : part.toolCallId)}
								{#if part.type === "reasoning"}
									{@render reasoningActivity(
										`${message.id}-${run.key}-${index}`,
										part,
										isStreaming
									)}
								{:else}
									{@render toolActivity(part, isStreaming)}
								{/if}
							{/each}
						</Trace.Root>
					{/if}
				{/each}
				{#if !isStreaming && sources.length > 0}
					{#snippet sourceLinks()}
						<Trace.Root>
							{#each sources as source (source.sourceId)}
								{@render linkActivity(source.url, source.title ?? source.url)}
							{/each}
						</Trace.Root>
					{/snippet}
					<Trace.Root>
						{@render activityRow(
							undefined,
							linkGlyph,
							`Used ${sources.length} sources`,
							sourceLinks
						)}
					</Trace.Root>
				{/if}
			</Message.Content>
		</Message.Root>
	{/if}
{/snippet}

<Example title="Chat" containerClass="md:col-span-2">
	<div class="flex min-h-96 w-full max-w-xl flex-col gap-6 text-sm">
		{#each chat.messages as message (message.id)}
			{@render chatbotMessageItem(message, busy && message.id === lastMessage?.id)}
		{/each}
		{#if chat.status === "submitted"}
			<Trace.Root>
				{@render activityRow("running", brainGlyph, "Thinking")}
			</Trace.Root>
		{/if}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			disabled={busy}
			onclick={handleClick}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	</div>
</Example>
