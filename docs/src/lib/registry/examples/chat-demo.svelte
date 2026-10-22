<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import TelescopeIcon from "@lucide/svelte/icons/telescope";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Chat } from "@ai-sdk/svelte";
	import { prefersReducedMotion } from "svelte/motion";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import Markdown from "$lib/components/markdown/markdown.svelte";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { MESSAGE_ANIMATIONS, type MessageAnimationPreset } from "$lib/message-animations.js";
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
		.user("Add a dark mode toggle to the settings page.")
		.sleep(600)
		.assistant(({ writer }) => {
			writer.reasoning(
				"I need to know how themes are set up before I add a toggle. If mode-watcher is already in the layout, the toggle only has to call setMode."
			);
			writer.sleep(400);
			writer
				.tool("runCommand", { input: { command: "rg -l ModeWatcher src/routes" } })
				.sleep(800)
				.output({ stdout: "src/routes/+layout.svelte" });
			writer.sleep(500);
			writer.text(`mode-watcher is already set up in \`src/routes/+layout.svelte\`, so the toggle only has to call \`setMode\`.

**Changes**

- Added \`src/lib/components/mode-toggle.svelte\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`src/routes/settings/+page.svelte\`.

\`\`\`ts
import { setMode } from "mode-watcher"

setMode("dark")
\`\`\`
`);
		})
		.user("Make it follow the system setting by default.")
		.sleep(600)
		.assistant(({ writer }) => {
			writer.reasoning(
				"The default theme lives on the ModeWatcher. I should check what it is set to now."
			);
			writer.sleep(400);
			writer
				.tool("runCommand", {
					input: { command: "rg -n defaultMode src/routes/+layout.svelte" },
				})
				.sleep(800)
				.output({
					stdout: '12:  <ModeWatcher defaultMode="light" />',
				});
			writer.sleep(500);
			writer.text(`It was set to \`light\`. I updated the \`ModeWatcher\` in \`src/routes/+layout.svelte\`:

\`\`\`svelte
<ModeWatcher defaultMode="system" />
\`\`\`

New visitors now get the theme from their OS. The toggle also has a **System** option, so anyone who picked Light or Dark can switch back.
`);
		})
		.user("Run the build before I ship it.")
		.sleep(600)
		.assistant(({ writer }) => {
			writer
				.tool("runCommand", { input: { command: "pnpm build" } })
				.sleep(1600)
				.output({
					stdout:
						"vite v8.1.5 building for production...\n\n✓ Built in 4.2s\n✓ Prerendered 12 pages",
				});
			writer.sleep(500);
			writer.text(`The build passes, so it is ready to ship.

- Compiled in **4.2s**.
- Generated all **12** static pages.
`);
		});

	const initialMessages = script.get(0);
	const transport = script.transport({
		delayMs: 16,
		fallback: "This demo only knows the scripted turns. Press reset to start over.",
	});

	const chat = new Chat<ChatMessage>({ messages: initialMessages, transport });

	let draft = $state<string | null>(null);
	let form = $state<HTMLFormElement | null>(null);
	// The reader's choice for each reasoning row. Until they click, it follows `running`.
	let reasoningOpen = $state<Record<string, boolean>>({});

	const nextMessage = $derived(script.next(chat.messages));
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
	const text = $derived(draft ?? (nextMessage ? getMessageText(nextMessage) : ""));
	const canSend = $derived(text.trim().length > 0 && !busy);

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!canSend) {
			return;
		}

		if (draft === null && nextMessage) {
			void chat.sendMessage(nextMessage);
		} else {
			void chat.sendMessage({ text: text.trim() });
		}
		draft = null;
	}

	const enterPreset: MessageAnimationPreset = MESSAGE_ANIMATIONS["slide-up"];

	function enterMessage(node: HTMLElement) {
		if (prefersReducedMotion.current) return { duration: 0 };
		return enterPreset.transition(node);
	}
</script>

{#snippet reasoningRow(id: string, text: string, running: boolean)}
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

{#snippet toolRow(part: ToolPart, streaming: boolean)}
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

<MessageScroller.Provider>
	<div
		class="relative flex w-full flex-col gap-4 [[data-slot=preview]:has(&)]:bg-background [[data-slot=preview]:has(&)>div]:p-0!"
	>
		<div class="flex h-200 w-full flex-col gap-4">
			<div class="flex items-start justify-between gap-4 p-8 pb-4">
				<div class="flex flex-col gap-1">
					<div class="font-medium">New Thread</div>
					<div class="text-sm text-muted-foreground">Ask the agent to change your code.</div>
				</div>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								size="icon"
								aria-label="Reset conversation"
								onclick={() => {
									chat.messages = initialMessages;
									draft = null;
									reasoningOpen = {};
								}}
								disabled={busy}
							>
								<RotateCwIcon />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Reset</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<div class="min-h-0 flex-1">
				{#if chat.messages.length === 0}
					<Empty.Root class="h-full">
						<Empty.Header>
							<Empty.Media variant="icon">
								<MessageCircleDashedIcon />
							</Empty.Media>
							<Empty.Title>What should we build?</Empty.Title>
							<Empty.Description>
								The agent can read your code, run commands and make changes. Press send to start.
							</Empty.Description>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content aria-busy={busy} class="gap-6 px-8 py-0">
								{#each chat.messages as message (message.id)}
									{#if message.role === "user"}
										<MessageScroller.Item messageId={message.id} scrollAnchor>
											{#snippet child({ props })}
												<div {...props} in:enterMessage|global>
													<Message.Root align="end">
														<Message.Content>
															<Bubble.Root align="end" variant="muted">
																<Bubble.Content>{getMessageText(message)}</Bubble.Content>
															</Bubble.Root>
														</Message.Content>
													</Message.Root>
												</div>
											{/snippet}
										</MessageScroller.Item>
									{:else}
										{@const streaming = busy && message === chat.messages.at(-1)}
										{@const hasSteps = message.parts.some(
											(part) => part.type === "reasoning" || part.type === "tool-runCommand"
										)}
										{@const reply = getMessageText(message)}
										<MessageScroller.Item messageId={message.id}>
											<Message.Root>
												<Message.Content class="gap-3">
													{#if hasSteps}
														<Trace.Root>
															{#each message.parts as part, index (index)}
																{#if part.type === "reasoning"}
																	{@render reasoningRow(
																		`${message.id}-${index}`,
																		part.text,
																		part.state === "streaming"
																	)}
																{:else if part.type === "tool-runCommand"}
																	{@render toolRow(part, streaming)}
																{/if}
															{/each}
														</Trace.Root>
													{/if}
													{#if reply}
														<Markdown content={reply} />
													{/if}
												</Message.Content>
											</Message.Root>
										</MessageScroller.Item>
									{/if}
								{/each}
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				{/if}
			</div>
			<div class="p-8 pt-0">
				<form bind:this={form} onsubmit={onSubmit} class="w-full">
					<InputGroup.Root>
						<InputGroup.Textarea
							bind:value={() => text, (value) => (draft = value ?? "")}
							placeholder="Ask the agent..."
							aria-label="Message"
							class="min-h-14"
							onkeydown={(event) => {
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									form?.requestSubmit();
								}
							}}
						/>
						<InputGroup.Addon align="block-end" class="pt-1">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<InputGroup.Button
											{...props}
											aria-label="Add context"
											type="button"
											size="icon-sm"
											variant="outline"
										>
											<PlusIcon />
										</InputGroup.Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="start" side="top" class="w-44">
									<DropdownMenu.Item>
										<PaperclipIcon />
										Add Photos & Files
									</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>
										<TelescopeIcon />
										Deep Research
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<GlobeIcon />
										Web Search
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
							<InputGroup.Button
								type="submit"
								variant="default"
								size="icon-sm"
								disabled={!canSend}
								class="ml-auto"
							>
								<ArrowUpIcon />
								<span class="sr-only">Send</span>
							</InputGroup.Button>
						</InputGroup.Addon>
					</InputGroup.Root>
				</form>
			</div>
		</div>
	</div>
</MessageScroller.Provider>
