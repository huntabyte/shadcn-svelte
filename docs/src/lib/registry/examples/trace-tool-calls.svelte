<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { onDestroy } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { getMessageText, splitTextDeltas, wait } from "$lib/ai.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type ToolPart = {
		type: "dynamic-tool";
		toolName: string;
		toolCallId: string;
		state: "input-available" | "output-available" | "output-error" | "output-denied";
		input?: { command?: string };
		output?: { stdout: string };
		errorText?: string;
	};

	type Part = { type: "text"; text: string } | ToolPart;

	type ChatMessage = { id: string; role: "user" | "assistant"; parts: Part[] };

	type Step =
		| { type: "tool"; command: string; delayMs: number; stdout?: string; errorText?: string }
		| { type: "text"; text: string };

	const question: ChatMessage = {
		id: "user-1",
		role: "user",
		parts: [{ type: "text", text: "Which package managers are installed?" }],
	};

	const steps: Step[] = [
		{ type: "tool", command: "node --version", delayMs: 900, stdout: "v24.18.0" },
		{ type: "tool", command: "npm --version", delayMs: 900, stdout: "11.6.2" },
		{
			type: "tool",
			command: "pnpm --version",
			delayMs: 900,
			errorText: "command not found: pnpm",
		},
		{ type: "text", text: "Node 24 and npm 11 are installed. pnpm is not." },
	];

	let messages = $state<ChatMessage[]>([]);
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	let generation = 0;

	const nextMessage = $derived(
		messages.some((message) => message.id === question.id) ? null : question
	);
	const busy = $derived(status === "submitted" || status === "streaming");

	async function sendMessage(message: ChatMessage) {
		const run = ++generation;
		messages.push(structuredClone(message));
		status = "submitted";

		messages.push({ id: "assistant-1", role: "assistant", parts: [] });
		const assistant = messages[messages.length - 1];
		status = "streaming";

		for (const [index, step] of steps.entries()) {
			if (step.type === "tool") {
				assistant.parts.push({
					type: "dynamic-tool",
					toolName: "runCommand",
					toolCallId: `tool-${index + 1}`,
					state: "input-available",
					input: { command: step.command },
				});
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

			assistant.parts.push({ type: "text", text: "" });
			const part = assistant.parts[assistant.parts.length - 1];

			for (const delta of splitTextDeltas(step.text)) {
				await wait(20);
				if (run !== generation) return;
				if (part.type === "text") part.text += delta;
			}
		}

		status = "ready";
	}

	function reset() {
		generation += 1;
		status = "ready";
		messages = [];
	}

	onDestroy(() => {
		generation += 1;
	});

	function groupParts(parts: Part[]) {
		const runs: { trace: boolean; parts: Part[] }[] = [];

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

{#snippet toolTrace(part: ToolPart, live: boolean)}
	{@const command = part.input?.command}
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
						code={failed ? part.errorText : part.output?.stdout}
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
			{@const live = status === "streaming" && message.id === messages.at(-1)?.id}
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
			onclick={() => (nextMessage ? sendMessage(nextMessage) : reset())}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
