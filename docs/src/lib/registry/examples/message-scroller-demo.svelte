<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import TelescopeIcon from "@lucide/svelte/icons/telescope";
	import { onDestroy } from "svelte";

	type DemoMessage = {
		id: string;
		role: "assistant" | "user";
		text: string;
	};

	const conversationTurns = [
		{
			user: "I'm building a chat for our app and the scroll behavior is driving me nuts.",
			assistant:
				"Wrap your message list in MessageScroller and turn on autoScroll. It follows new content while the reader is at the bottom and backs off as soon as they scroll up.",
		},
		{
			user: "Okay, but new messages still feel jarring.",
			assistant:
				"Set scrollAnchor on each user turn. The new exchange settles into view while a small peek of the previous context remains visible.",
		},
		{
			user: "And if someone scrolls up to read an older answer?",
			assistant:
				"Their position stays put. MessageScrollerButton appears when unseen content is below and returns them to the live edge when they are ready.",
		},
		{
			user: "Last one — does this work with assistive tech?",
			assistant:
				'MessageScrollerContent uses role="log" and aria-relevant="additions", and the scroll control is a real button with an accessible label.',
		},
	];

	let messages = $state<DemoMessage[]>([]);
	let turnIndex = $state(0);
	let streamingTimer: ReturnType<typeof setInterval> | undefined;
	let isStreaming = $state(false);
	const nextMessage = $derived(conversationTurns[turnIndex]?.user);

	function resetConversation() {
		if (streamingTimer) clearInterval(streamingTimer);
		streamingTimer = undefined;
		messages = [];
		turnIndex = 0;
		isStreaming = false;
	}

	function streamAssistantMessage(turn: (typeof conversationTurns)[number]) {
		const messageId = `assistant-${turnIndex}`;
		const words = turn.assistant.split(" ");
		let wordIndex = 0;
		messages = [...messages, { id: messageId, role: "assistant", text: "" }];

		streamingTimer = setInterval(() => {
			wordIndex += 1;
			messages = messages.map((message) =>
				message.id === messageId
					? { ...message, text: words.slice(0, wordIndex).join(" ") }
					: message
			);
			if (wordIndex < words.length) return;
			clearInterval(streamingTimer);
			streamingTimer = undefined;
			turnIndex += 1;
			isStreaming = false;
		}, 35);
	}

	function sendNextMessage(event: SubmitEvent) {
		event.preventDefault();
		const turn = conversationTurns[turnIndex];
		if (!turn || isStreaming) return;

		isStreaming = true;
		messages = [...messages, { id: `user-${turnIndex}`, role: "user", text: turn.user }];
		streamAssistantMessage(turn);
	}

	onDestroy(() => {
		if (streamingTimer) clearInterval(streamingTimer);
	});
</script>

<MessageScroller.Provider autoScroll>
	<div class="relative flex flex-col gap-4">
		<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
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
									disabled={isStreaming}
								>
									<RotateCwIcon />
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Reset</Tooltip.Content>
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
								What are we working on today? Press send to start a new
								conversation.
							</Empty.Description>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content
								aria-busy={isStreaming}
								class="p-(--card-spacing)"
							>
								{#each messages as message (message.id)}
									<MessageScroller.Item
										messageId={message.id}
										scrollAnchor={message.role === "user"}
									>
										<Message.Root
											align={message.role === "user" ? "end" : "start"}
										>
											<Message.Content>
												<Bubble.Root
													variant={message.role === "user"
														? "default"
														: "muted"}
												>
													<Bubble.Content>{message.text}</Bubble.Content>
												</Bubble.Root>
											</Message.Content>
										</Message.Root>
									</MessageScroller.Item>
								{/each}
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				{/if}
			</Card.Content>
			<Card.Footer class="flex-col gap-2">
				<form onsubmit={sendNextMessage} class="w-full">
					<InputGroup.Root>
						<div class="h-14 w-full px-3 py-2.5">
							<span
								class="line-clamp-2 opacity-60 data-[ready=true]:opacity-100"
								data-ready={!isStreaming}
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
								<DropdownMenu.Content align="start" side="top" class="w-44">
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
								disabled={!nextMessage || isStreaming}
								class="ms-auto"
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
