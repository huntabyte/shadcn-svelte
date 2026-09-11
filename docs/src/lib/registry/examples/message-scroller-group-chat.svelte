<script lang="ts">
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import GroupChatMarker from "$lib/components/message-scroller/group-chat-marker.svelte";
	import GroupChatMessage from "$lib/components/message-scroller/group-chat-message.svelte";

	const currentUser = "Grace";

	type GroupChatItem =
		| {
				id: string;
				type: "event";
				text: string;
				scrollAnchor?: boolean;
		  }
		| {
				id: string;
				type: "message";
				sender: string;
				role: "assistant" | "participant";
				text: string;
				scrollAnchor?: boolean;
		  };

	const initialItems = [
		{
			id: "group-1",
			type: "message",
			sender: "Grace",
			role: "participant",
			text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
		},
		{
			id: "group-2",
			type: "message",
			sender: "Mary (Agent)",
			role: "assistant",
			text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
		},
		{
			id: "group-3",
			type: "message",
			sender: "Grace",
			role: "participant",
			text: "ping @rocky",
			scrollAnchor: true,
		},
	] satisfies GroupChatItem[];

	const rockyMarker = {
		id: "group-4",
		type: "event",
		text: "Rocky has joined the chat",
		scrollAnchor: true,
	} satisfies GroupChatItem;

	const rockyMessage = {
		id: "group-5",
		type: "message",
		sender: "Rocky",
		role: "participant",
		text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
	} satisfies GroupChatItem;

	let demoKey = $state(0);
	let rockyTurn = $state<"idle" | "marker" | "message">("idle");
	const items = $derived(
		rockyTurn === "message"
			? [...initialItems, rockyMarker, rockyMessage]
			: rockyTurn === "marker"
				? [...initialItems, rockyMarker]
				: initialItems
	);
	const buttonLabel = $derived(rockyTurn === "idle" ? "Add Rocky" : "Send Message as Rocky");
	const isComplete = $derived(rockyTurn === "message");
</script>

<MessageScroller.Provider>
	<div class="relative flex flex-col gap-4">
		<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
			<Card.Header class="gap-1 border-b">
				<Card.Title>Group Chat</Card.Title>
				<Card.Description>
					A group chat with several participants and an assistant. The Marker is marked as a turn.
				</Card.Description>
				<Card.Action>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									type="button"
									variant="outline"
									size="icon"
									aria-label="Reset conversation"
									disabled={rockyTurn === "idle"}
									onclick={() => {
										rockyTurn = "idle";
										demoKey += 1;
									}}
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
			<Card.Content class="min-h-0 flex-1 p-0">
				<MessageScroller.Provider>
					{#key demoKey}
						<MessageScroller.Root>
							<MessageScroller.Viewport>
								<MessageScroller.Content class="p-(--card-spacing)">
									{#each items as item (item.id)}
										{#if item.type === "message"}
											<GroupChatMessage {item} {currentUser} />
										{:else}
											<GroupChatMarker {item} scrollAnchor={item.scrollAnchor} />
										{/if}
									{/each}
								</MessageScroller.Content>
							</MessageScroller.Viewport>
							<MessageScroller.Button />
						</MessageScroller.Root>
					{/key}
				</MessageScroller.Provider>
			</Card.Content>
			<Card.Footer class="flex flex-col items-center gap-2 border-t">
				<Button
					type="button"
					disabled={isComplete}
					onclick={() => (rockyTurn = rockyTurn === "idle" ? "marker" : "message")}
					class="w-full"
					variant="secondary"
				>
					{buttonLabel}
				</Button>
				<p class="text-xs text-muted-foreground">
					{rockyTurn === "idle"
						? "This will create a marker and make it the anchor"
						: "Now send Rocky's reply into the conversation"}
				</p>
			</Card.Footer>
		</Card.Root>
		<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
			When a user joins, a marker is created. scrollAnchor on the marker marks it as the next turn
		</div>
	</div>
</MessageScroller.Provider>
