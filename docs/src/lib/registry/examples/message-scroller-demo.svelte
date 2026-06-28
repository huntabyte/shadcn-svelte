<script lang="ts">
	import { onDestroy } from "svelte";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import TelescopeIcon from "@lucide/svelte/icons/telescope";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	type DemoMessage = {
		id: string;
		role: "user" | "assistant";
		content: string;
	};

	const conversation = [
		{
			user: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
			assistant:
				"That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent.",
		},
		{
			user: "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
			assistant:
				"MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container.",
		},
		{
			user: "And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
			assistant:
				"You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not.",
		},
		{
			user: "Last one — does this work with assistive tech?",
			assistant:
				'`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.',
		},
	] as const;

	const THINKING_DELAY_MS = 1000;

	let messages = $state<DemoMessage[]>([]);
	let stepIndex = $state(0);
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	let timeoutIds: ReturnType<typeof setTimeout>[] = [];

	const nextMessage = $derived(conversation[stepIndex]?.user);
	const isBusy = $derived(status === "submitted" || status === "streaming");

	function queueTimeout(callback: () => void, delay: number) {
		const id = setTimeout(callback, delay);
		timeoutIds.push(id);
		return id;
	}

	function clearQueuedTimeouts() {
		for (const id of timeoutIds) {
			clearTimeout(id);
		}
		timeoutIds = [];
	}

	function updateMessage(id: string, content: string) {
		messages = messages.map((message) =>
			message.id === id ? { ...message, content } : message
		);
	}

	function streamAssistantMessage(content: string, messageId: string, offset = 0) {
		const nextOffset = Math.min(content.length, offset + 8);
		updateMessage(messageId, content.slice(0, nextOffset));

		if (nextOffset < content.length) {
			queueTimeout(() => streamAssistantMessage(content, messageId, nextOffset), 16);
			return;
		}

		stepIndex += 1;
		status = "ready";
	}

	function sendMessage() {
		const next = conversation[stepIndex];
		if (!next || isBusy) return;

		const userId = `user-${stepIndex}`;
		const assistantId = `assistant-${stepIndex}`;

		messages = [
			...messages,
			{
				id: userId,
				role: "user",
				content: next.user,
			},
		];
		status = "submitted";

		queueTimeout(() => {
			messages = [
				...messages,
				{
					id: assistantId,
					role: "assistant",
					content: "",
				},
			];
			status = "streaming";
			streamAssistantMessage(next.assistant, assistantId);
		}, THINKING_DELAY_MS);
	}

	function resetConversation() {
		clearQueuedTimeouts();
		messages = [];
		stepIndex = 0;
		status = "ready";
	}

	onDestroy(clearQueuedTimeouts);
</script>

{#snippet MessageBubble(message: DemoMessage)}
	<MessageScroller.Item messageId={message.id} scrollAnchor={message.role === "user"}>
		{@const paragraphs = message.content
			.split(/\n\s*\n/)
			.map((paragraph) => paragraph.trim())
			.filter(Boolean)}
		<Message.Root align={message.role === "user" ? "end" : "start"}>
			<Message.Content>
				<Bubble.Root variant={message.role === "user" ? "muted" : "ghost"}>
					<Bubble.Content class="space-y-2">
						{#each paragraphs as paragraph, paragraphIndex (paragraphIndex)}
							<p class="whitespace-pre-wrap">
								{paragraph}
							</p>
						{/each}
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
	</MessageScroller.Item>
{/snippet}

<MessageScroller.Provider>
	<div class="relative flex flex-col gap-4">
		<Card.Root
			class="mx-auto h-140 w-full max-w-sm gap-0 [--card-spacing:calc(var(--spacing)*5)]"
		>
			<Card.Header class="gap-1 border-b">
				<Card.Title>New Chat</Card.Title>
				<Card.Description>How can I help you today?</Card.Description>
				<Card.Action>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									variant="outline"
									size="icon"
									aria-label="Reset conversation"
									onclick={resetConversation}
									disabled={isBusy}
								>
									<RotateCwIcon />
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Reset</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Card.Action>
			</Card.Header>
			<Card.Content class="flex-1 overflow-hidden p-0">
				{#if messages.length === 0}
					<Empty.Root class="h-full">
						<Empty.Header>
							<Empty.Media variant="icon">
								<MessageCircleDashedIcon />
							</Empty.Media>
							<Empty.Title>Morning, shadcn!</Empty.Title>
							<Empty.Description>
								What are we working on today? Press send to start a new conversation
							</Empty.Description>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content aria-busy={isBusy} class="p-(--card-spacing)">
								{#each messages as message (message.id)}
									{@render MessageBubble(message)}
								{/each}
								{#if status === "submitted"}
									<MessageScroller.Item scrollAnchor={false}>
										<Marker.Root role="status">
											<Marker.Icon>
												<Spinner />
											</Marker.Icon>
											<Marker.Content class="shimmer"
												>Thinking...</Marker.Content
											>
										</Marker.Root>
									</MessageScroller.Item>
								{/if}
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				{/if}
			</Card.Content>
			<Card.Footer class="flex-col gap-2">
				<form
					onsubmit={(event) => {
						event.preventDefault();
						sendMessage();
					}}
					class="w-full"
				>
					<InputGroup.Root>
						<div class="h-14 w-full px-3 py-2.5">
							<span
								class="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
								data-status={status}
							>
								{#if nextMessage}
									{nextMessage}
								{:else}
									<span class="text-muted-foreground">
										No messages queued. Reset the conversation.
									</span>
								{/if}
							</span>
						</div>
						<InputGroup.Addon align="block-end" class="pt-1">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<InputGroup.Button
											{...props}
											aria-label="Add files"
											type="button"
											size="icon-sm"
											variant="outline"
										>
											<PlusIcon />
										</InputGroup.Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									align="start"
									side="top"
									class="w-44"
									portalProps={{ disabled: true }}
								>
									<DropdownMenu.Item>
										<PaperclipIcon />
										Add Photos & Files
									</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>
										<ImageIcon />
										Create Image
									</DropdownMenu.Item>
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
								disabled={!nextMessage || isBusy}
								class="ml-auto"
							>
								<ArrowUpIcon />
								<span class="sr-only">Send</span>
							</InputGroup.Button>
						</InputGroup.Addon>
					</InputGroup.Root>
				</form>
			</Card.Footer>
		</Card.Root>
		<div class="text-muted-foreground px-0.5 text-center text-xs">
			Demo is read only. Press send to send messages.
		</div>
	</div>
</MessageScroller.Provider>
