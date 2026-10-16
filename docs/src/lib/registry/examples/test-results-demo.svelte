<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import CircleDashedIcon from "@lucide/svelte/icons/circle-dashed";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import FlaskConicalIcon from "@lucide/svelte/icons/flask-conical";
	import XIcon from "@lucide/svelte/icons/x";
	import { Chat } from "@ai-sdk/svelte";
	import { untrack } from "svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIDataTypes, UIMessage } from "ai";

	type Test = {
		name: string;
		status: "passed" | "failed" | "skipped";
		error?: string;
	};

	type ChatMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			runTests: {
				input: { command: string };
				output: { suites: { name: string; tests: Test[] }[] };
			};
		}
	>;

	type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-runTests" }>;

	const script = createChat<ChatMessage>()
		.user("Run the checkout tests.")
		.assistant(({ writer }) => {
			writer
				.tool("runTests", { input: { command: "pnpm test checkout" } })
				.sleep(1500)
				.output({
					suites: [
						{
							name: "cart.test.ts",
							tests: [
								{ name: "adds an item", status: "passed" },
								{ name: "removes an item", status: "passed" },
								{ name: "applies a discount code", status: "passed" },
							],
						},
						{
							name: "payment.test.ts",
							tests: [
								{ name: "charges the saved card", status: "passed" },
								{
									name: "retries a declined card",
									status: "failed",
									error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
								},
							],
						},
					],
				});
			writer.text(
				"One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	function countTests(tests: Test[]) {
		return {
			total: tests.length,
			failed: tests.filter((test) => test.status === "failed").length,
			skipped: tests.filter((test) => test.status === "skipped").length,
		};
	}

	function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
		return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`]
			.filter(Boolean)
			.join(", ");
	}
</script>

{#snippet testRow(test: Test)}
	{#if test.status === "failed"}
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="error">
					<Trace.Icon>
						<XIcon />
					</Trace.Icon>
					<Trace.Title>{test.name}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={test.error ?? ""} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{:else}
		<Trace.Line>
			<Trace.Icon>
				{#if test.status === "skipped"}
					<CircleDashedIcon />
				{:else}
					<CheckIcon />
				{/if}
			</Trace.Icon>
			<Trace.Title>
				{test.status === "skipped" ? `Skipped ${test.name}` : test.name}
			</Trace.Title>
		</Trace.Line>
	{/if}
{/snippet}

{#snippet testResultsRow(part: ToolPart, streaming: boolean)}
	{@const command = part.input?.command}
	{#if part.state !== "output-available"}
		{@const running = streaming && part.state !== "output-error"}
		<Trace.Line status={running ? "running" : "error"}>
			<Trace.Icon>
				<FlaskConicalIcon />
			</Trace.Icon>
			<Trace.Title>
				{running ? "Running" : "Failed to run"}
				{command}
			</Trace.Title>
		</Trace.Line>
	{:else}
		{@const suites = part.output.suites}
		{@const summary = countTests(suites.flatMap((suite) => suite.tests))}
		<!-- Like `defaultOpen`: read once, when the row first renders. -->
		<Trace.Collapsible open={untrack(() => summary.failed > 0)}>
			<Trace.CollapsibleTrigger>
				<Trace.Line status={summary.failed > 0 ? "error" : undefined}>
					<Trace.Icon>
						<FlaskConicalIcon />
					</Trace.Icon>
					<Trace.Title>Ran {formatCounts(summary)}</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<Trace.Root>
					{#each suites as suite, suiteIndex (suiteIndex)}
						{@const counts = countTests(suite.tests)}
						<Trace.Collapsible open={untrack(() => counts.failed > 0)}>
							<Trace.CollapsibleTrigger>
								<Trace.Line status={counts.failed > 0 ? "error" : undefined}>
									<Trace.Icon>
										<FileCodeIcon />
									</Trace.Icon>
									<Trace.Title>
										{suite.name}, {formatCounts(counts)}
									</Trace.Title>
								</Trace.Line>
							</Trace.CollapsibleTrigger>
							<Trace.CollapsibleContent>
								<Trace.Root>
									{#each suite.tests as test, testIndex (testIndex)}
										{@render testRow(test)}
									{/each}
								</Trace.Root>
							</Trace.CollapsibleContent>
						</Trace.Collapsible>
					{/each}
				</Trace.Root>
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
			{@const tools = message.parts.filter((part) => part.type === "tool-runTests")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if tools.length > 0}
						<Trace.Root>
							{#each tools as part (part.toolCallId)}
								{@render testResultsRow(part, streaming)}
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
