<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import { onDestroy } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { getMessageText, splitTextDeltas, wait } from "$lib/ai.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type ToolPart = {
		type: "tool-runCommand";
		toolCallId: string;
		state: "input-available" | "output-available" | "output-error";
		input: { command: string };
		output?: { stdout: string };
		errorText?: string;
	};

	type SourcePart = {
		type: "source-url";
		sourceId: string;
		url: string;
		title?: string;
	};

	type Part =
		| { type: "text"; text: string }
		| { type: "reasoning"; text: string; state: "streaming" | "done" }
		| ToolPart
		| SourcePart;

	type ChatMessage = { id: string; role: "user" | "assistant"; parts: Part[] };

	type Step =
		| { type: "reasoning"; text: string; delayMs: number }
		| { type: "text"; text: string; delayMs: number }
		| { type: "tool"; command: string; delayMs: number; stdout?: string; errorText?: string }
		| { type: "source"; url: string; title: string }
		| { type: "sleep"; delayMs: number };

	const question: ChatMessage = {
		id: "user-1",
		role: "user",
		parts: [{ type: "text", text: "Why does pnpm install fail in CI?" }],
	};

	const steps: Step[] = [
		{
			type: "reasoning",
			text: "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
			delayMs: 40,
		},
		{ type: "tool", command: "pnpm --version", delayMs: 700, stdout: "10.18.0" },
		{
			type: "tool",
			command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
			delayMs: 900,
			stdout: " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
		},
		{
			type: "tool",
			command: "pnpm install --frozen-lockfile",
			delayMs: 1200,
			errorText:
				'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json',
		},
		{
			type: "source",
			url: "https://pnpm.io/cli/install#--frozen-lockfile",
			title: "pnpm install | pnpm.io",
		},
		{
			type: "source",
			url: "https://pnpm.io/continuous-integration",
			title: "Continuous Integration | pnpm.io",
		},
		{ type: "sleep", delayMs: 1000 },
		{
			type: "text",
			text: "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile.",
			delayMs: 20,
		},
	];

	function toToolPart(step: Extract<Step, { type: "tool" }>, index: number): ToolPart {
		return {
			type: "tool-runCommand",
			toolCallId: `tool-${index + 1}`,
			state: "input-available",
			input: { command: step.command },
		};
	}

	function toSourcePart(step: Extract<Step, { type: "source" }>): SourcePart {
		return { type: "source-url", sourceId: step.url, url: step.url, title: step.title };
	}

	function getTranscript(): ChatMessage[] {
		const parts: Part[] = steps.flatMap((step, index): Part[] => {
			if (step.type === "reasoning") return [{ type: "reasoning", text: step.text, state: "done" }];
			if (step.type === "text") return [{ type: "text", text: step.text }];
			if (step.type === "source") return [toSourcePart(step)];
			if (step.type === "tool") {
				return [
					step.errorText
						? { ...toToolPart(step, index), state: "output-error", errorText: step.errorText }
						: {
								...toToolPart(step, index),
								state: "output-available",
								output: { stdout: step.stdout ?? "" },
							},
				];
			}
			return [];
		});

		return [structuredClone(question), { id: "assistant-1", role: "assistant", parts }];
	}

	let messages = $state<ChatMessage[]>(getTranscript());
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	// Open state the user picked for each thinking row, keyed by message and part.
	let openRows = $state<Record<string, boolean>>({});
	let generation = 0;

	const busy = $derived(status === "submitted" || status === "streaming");

	async function sendMessage(message: ChatMessage) {
		const run = ++generation;
		messages.push(structuredClone(message));
		status = "submitted";

		messages.push({ id: "assistant-1", role: "assistant", parts: [] });
		const assistant = messages[messages.length - 1];
		status = "streaming";

		for (const [index, step] of steps.entries()) {
			if (step.type === "sleep") {
				await wait(step.delayMs);
				if (run !== generation) return;
				continue;
			}

			if (step.type === "source") {
				assistant.parts.push(toSourcePart(step));
				continue;
			}

			if (step.type === "tool") {
				assistant.parts.push(toToolPart(step, index));
				const part = assistant.parts[assistant.parts.length - 1] as ToolPart;

				await wait(step.delayMs);
				if (run !== generation) return;

				if (step.errorText) {
					part.errorText = step.errorText;
					part.state = "output-error";
				} else {
					part.output = { stdout: step.stdout ?? "" };
					part.state = "output-available";
				}
				continue;
			}

			assistant.parts.push(
				step.type === "reasoning"
					? { type: "reasoning", text: "", state: "streaming" }
					: { type: "text", text: "" }
			);
			const part = assistant.parts[assistant.parts.length - 1] as Extract<
				Part,
				{ type: "text" | "reasoning" }
			>;

			for (const delta of splitTextDeltas(step.text)) {
				await wait(step.delayMs);
				if (run !== generation) return;
				part.text += delta;
			}

			if (part.type === "reasoning") {
				part.state = "done";
			}
		}

		status = "ready";
	}

	function replay() {
		generation += 1;
		openRows = {};
		messages = [];
		sendMessage(question);
	}

	onDestroy(() => {
		generation += 1;
	});
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

{#snippet thinkingRow(text: string, running: boolean, key: string)}
	{#if text.length === 0}
		{@render thinkingLine(running)}
	{:else}
		<Trace.Collapsible
			open={openRows[key] ?? running}
			onOpenChange={(open) => (openRows[key] = open)}
		>
			<Trace.CollapsibleTrigger>{@render thinkingLine(running)}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="whitespace-pre-wrap">
				{text}
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

{#snippet toolRow(part: ToolPart, streaming: boolean, defaultOpen: boolean)}
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
						<CodeBlock.Content wrap class="max-h-64" code={part.output?.stdout} />
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
				{#each sources as source (source.url)}
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
	{#each messages as message (message.id)}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			{@const streaming = busy && message.id === messages.at(-1)?.id}
			{@const rows = message.parts.filter(
				(part) => part.type === "reasoning" || part.type === "tool-runCommand"
			)}
			{@const sources = message.parts.filter(
				(part): part is SourcePart => part.type === "source-url"
			)}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if rows.length + sources.length > 0}
						<Trace.Root>
							{#each rows as part, index (part.type === "tool-runCommand" ? part.toolCallId : index)}
								{#if part.type === "reasoning"}
									{@render thinkingRow(
										part.text,
										streaming && part.state === "streaming",
										`${message.id}-${index}`
									)}
								{:else if part.type === "tool-runCommand"}
									{@render toolRow(part, streaming, index === 2)}
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
		<Button variant="outline" size="sm" class="mt-auto self-start" onclick={replay}>Replay</Button>
	{/if}
</div>
