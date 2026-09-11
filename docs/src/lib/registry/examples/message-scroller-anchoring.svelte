<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import MessageCircleDashedIcon from "@lucide/svelte/icons/message-circle-dashed";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import MessageAnimated from "$lib/components/message-animated.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	type AnchorRole = "user" | "assistant";

	type ChatMessage = {
		id: string;
		role: AnchorRole;
		text: string;
	};

	const scriptedMessages: ChatMessage[] = [
		{
			id: "anchor-1-user",
			role: "user",
			text: "Can you show me how anchoring behaves when a new prompt starts the turn?",
		},
		{
			id: "anchor-1-assistant",
			role: "assistant",
			text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it.",
		},
		{
			id: "anchor-2-user",
			role: "user",
			text: "What changes when assistant messages are the anchor?",
		},
		{
			id: "anchor-2-assistant",
			role: "assistant",
			text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn.",
		},
		{
			id: "anchor-3-user",
			role: "user",
			text: "Can I switch roles and keep adding turns?",
		},
		{
			id: "anchor-3-assistant",
			role: "assistant",
			text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
		},
	];

	let anchorRole = $state<AnchorRole>("user");
	let messages = $state<ChatMessage[]>([]);
	let messageIndex = $state(0);
	const nextMessage = $derived(scriptedMessages[messageIndex]);

	function handleAnchorChange(value: string) {
		if (value === "user" || value === "assistant") {
			anchorRole = value;
			messages = [];
			messageIndex = 0;
		}
	}

	function sendNextMessage() {
		if (!nextMessage) {
			return;
		}

		messages = [...messages, nextMessage];
		messageIndex += 1;
	}
</script>

<div class="relative flex flex-col gap-4">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="border-b">
			<Card.Title>Anchoring Turns</Card.Title>
			<Card.Description>Choose which role settles near the top edge.</Card.Description>
			<Card.Action>
				<Button
					type="button"
					variant="outline"
					size="icon"
					aria-label="Reset anchored turns"
					disabled={messages.length === 0}
					onclick={() => {
						messages = [];
						messageIndex = 0;
					}}
				>
					<RotateCwIcon />
				</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			{#if messages.length === 0}
				<Empty.Root class="h-full">
					<Empty.Header>
						<Empty.Media variant="icon">
							<MessageCircleDashedIcon />
						</Empty.Media>
						<Empty.Title>No anchored messages yet</Empty.Title>
						<Empty.Description>
							Send the first message to see the selected role anchor.
						</Empty.Description>
					</Empty.Header>
				</Empty.Root>
			{:else}
				<MessageScroller.Provider>
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content class="p-(--card-spacing)">
								{#each messages as message (message.id)}
									<MessageAnimated
										{message}
										scrollAnchor={message.role === anchorRole}
										userVariant="muted"
										assistantVariant="ghost"
									/>
								{/each}
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				</MessageScroller.Provider>
			{/if}
		</Card.Content>
		<Card.Footer>
			<ToggleGroup.Root
				type="single"
				aria-label="Select scroll anchor role"
				value={anchorRole}
				onValueChange={handleAnchorChange}
			>
				<ToggleGroup.Item value="user" aria-label="Anchor user messages">User</ToggleGroup.Item>
				<ToggleGroup.Item value="assistant" aria-label="Anchor assistant messages">
					Assistant
				</ToggleGroup.Item>
			</ToggleGroup.Root>
			<Button type="button" size="icon" class="ml-auto" disabled={!nextMessage} onclick={sendNextMessage}>
				<ArrowUpIcon />
				<span class="sr-only">Send Message</span>
			</Button>
		</Card.Footer>
	</Card.Root>
	<div class="mx-auto max-w-xs px-0.5 text-center text-xs text-muted-foreground">
		Toggle the anchor role, then send messages to compare where turns settle.
	</div>
</div>
