<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import TelescopeIcon from "@lucide/svelte/icons/telescope";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type DemoMessage = { id: string; role: "user" | "assistant"; text: string };

	const turns = [
		{
			user: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
			assistant:
				"That's the classic streaming scroll problem. MessageScroller follows new content only while the reader remains at the live edge. The moment they scroll up, their position is preserved.",
		},
		{
			user: "Okay, but when someone sends a new message the view still feels jarring.",
			assistant:
				"MessageScroller.Item fixes that with turn anchoring. Set scrollAnchor on the turn that should settle near the top instead of blindly snapping to the bottom.",
		},
		{
			user: "And if they've scrolled up to re-read an older answer?",
			assistant:
				"Their place stays put. When unseen content exists, MessageScroller.Button appears so one action can return them to the latest reply.",
		},
		{
			user: "Last one — does this work with assistive tech?",
			assistant:
				'MessageScroller.Content uses role="log" and aria-relevant="additions" by default. The jump control is a real button and leaves the tab order when inactive.',
		},
	] as const;

	let messages = $state<DemoMessage[]>([]);
	let status = $state<"ready" | "submitted">("ready");
	let timeout: ReturnType<typeof setTimeout> | undefined;
	const nextTurn = $derived(turns[Math.floor(messages.length / 2)]);
	const isBusy = $derived(status === "submitted");

	function reset() {
		if (timeout) clearTimeout(timeout);
		status = "ready";
		messages = [];
	}

	function send(event: SubmitEvent) {
		event.preventDefault();
		if (!nextTurn || isBusy) return;

		const turn = nextTurn;
		const turnIndex = Math.floor(messages.length / 2);
		status = "submitted";
		messages = [...messages, { id: `user-${turnIndex}`, role: "user", text: turn.user }];
		timeout = setTimeout(() => {
			messages = [
				...messages,
				{ id: `assistant-${turnIndex}`, role: "assistant", text: turn.assistant },
			];
			status = "ready";
		}, 500);
	}
</script>

<MessageScroller.Provider>
	<div class="relative flex flex-col gap-4">
		<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
			<Card.Header class="gap-1 border-b">
				<Card.Title>New Chat</Card.Title>
				<Card.Description>How can I help you today?</Card.Description>
				<Card.Action>
					<Button
						variant="outline"
						size="icon"
						aria-label="Reset conversation"
						title="Reset"
						onclick={reset}
						disabled={isBusy}
					>
						<RotateCwIcon />
					</Button>
				</Card.Action>
			</Card.Header>
			<Card.Content class="flex-1 overflow-hidden p-0">
				{#if messages.length === 0}
					<Empty.Root class="h-full">
						<Empty.Header>
							<Empty.Media variant="icon"><MessageCircleDashedIcon /></Empty.Media>
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
									<MessageScroller.Item
										messageId={message.id}
										scrollAnchor={message.role === "user"}
									>
										<Message.Root align={message.role === "user" ? "end" : "start"}>
											<Message.Content>
												<Bubble.Root variant={message.role === "user" ? "muted" : "ghost"}>
													<Bubble.Content class="space-y-2">
														{#each message.text.split(/\n\s*\n/) as paragraph, index (`${message.id}-${index}`)}
															<p class="whitespace-pre-wrap">{paragraph}</p>
														{/each}
													</Bubble.Content>
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
				<form onsubmit={send} class="w-full">
					<InputGroup.Root>
						<div class="h-14 w-full px-3 py-2.5">
							<span
								class="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
								data-status={status}
							>
								{#if nextTurn}
									{nextTurn.user}
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
									<DropdownMenu.Item><PaperclipIcon /> Add Photos & Files</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item><ImageIcon /> Create Image</DropdownMenu.Item>
									<DropdownMenu.Item><TelescopeIcon /> Deep Research</DropdownMenu.Item>
									<DropdownMenu.Item><GlobeIcon /> Web Search</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
							<InputGroup.Button
								type="submit"
								variant="default"
								size="icon-sm"
								disabled={!nextTurn || isBusy}
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
		<div class="px-0.5 text-center text-xs text-muted-foreground">
			Demo is read only. Press send to send messages.
		</div>
	</div>
</MessageScroller.Provider>
