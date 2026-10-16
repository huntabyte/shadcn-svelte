<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Chat } from "@ai-sdk/svelte";
	import {
		lastAssistantMessageIsCompleteWithApprovalResponses,
		type UIDataTypes,
		type UIMessage,
	} from "ai";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";

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

	const script = createChat<ChatMessage>()
		.user("Clean up the build folder.")
		.sleep(600)
		.assistant(({ writer }) => {
			writer.reasoning(
				"The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
			);
			writer.sleep(400);
			writer.tool("runCommand", {
				input: { command: "rm -rf dist" },
				needsApproval: true,
				output: { stdout: "" },
			});
		})
		.assistant(({ writer, toolCall }) => {
			writer.sleep(600);
			writer.text(
				toolCall?.approved ? "Removed the dist folder." : "Okay, I left the dist folder in place."
			);
		});

	const initialMessages = script.get(0);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({
		messages: initialMessages,
		transport,
		sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
	});
	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	// The reader's choice for each reasoning row. Until they click, it follows `running`.
	let reasoningOpen = $state<Record<string, boolean>>({});
</script>

{#snippet reasoningLine(id: string, text: string, running: boolean)}
	<Trace.Collapsible
		open={reasoningOpen[id] ?? running}
		onOpenChange={(open) => (reasoningOpen[id] = open)}
	>
		<Trace.CollapsibleTrigger>
			<Trace.Line status={running ? "running" : undefined}>
				<Trace.Icon>
					{#if running}
						<LoaderCircleIcon class="animate-spin" />
					{:else}
						<CircleCheckIcon />
					{/if}
				</Trace.Icon>
				<Trace.Title>{running ? "Thinking" : "Thought"}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="whitespace-pre-wrap">{text}</Trace.CollapsibleContent>
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
			<Message.Root>
				<Message.Content class="gap-4">
					{#each message.parts as part, index (index)}
						{#if part.type === "text"}
							<p>{part.text}</p>
						{:else if part.type === "reasoning"}
							<Trace.Root>
								{@render reasoningLine(
									`${message.id}-${index}`,
									part.text,
									part.state === "streaming"
								)}
							</Trace.Root>
						{:else if part.type === "tool-runCommand"}
							{#if part.state === "approval-requested"}
								{@const approvalId = part.approval.id}
								<!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
								<Item.Root variant="outline" size="sm">
									<Item.Media variant="icon">
										<TerminalIcon />
									</Item.Media>
									<Item.Content>
										<Item.Title>Run {part.input.command}?</Item.Title>
										<Item.Description>The command runs in this project.</Item.Description>
									</Item.Content>
									<Item.Actions>
										<Button
											size="sm"
											variant="outline"
											onclick={() =>
												chat.addToolApprovalResponse({ id: approvalId, approved: false })}
										>
											Deny
										</Button>
										<Button
											size="sm"
											onclick={() =>
												chat.addToolApprovalResponse({ id: approvalId, approved: true })}
										>
											Approve
										</Button>
									</Item.Actions>
								</Item.Root>
							{:else}
								{@const denied =
									part.state === "output-denied" ||
									(part.state === "approval-responded" && !part.approval.approved)}
								<Trace.Root>
									<Trace.Line
										status={!denied && part.state !== "output-available" ? "running" : undefined}
									>
										<Trace.Icon>
											<TerminalIcon />
										</Trace.Icon>
										<Trace.Title>
											{denied ? "Denied" : part.state === "output-available" ? "Ran" : "Running"}
											{part.input?.command}
										</Trace.Title>
									</Trace.Line>
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
			onclick={() => {
				if (nextMessage) {
					void chat.sendMessage(nextMessage);
				} else {
					reasoningOpen = {};
					chat.messages = initialMessages;
				}
			}}
		>
			{nextMessage ? "Send message" : "Reset"}
		</Button>
	{/if}
</div>
