<script lang="ts">
	import MessageAnimated from "$lib/components/message-animated.svelte";
	import ScrollStateFooter from "$lib/components/message-scroller/scrollable-footer.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	const messages = Array.from({ length: 12 }, (_, index) => ({
		id: `scrollable-${index + 1}`,
		role: index % 2 === 0 ? "user" : "assistant",
		text:
			index % 2 === 0
				? `Review scroll checkpoint ${index + 1}.`
				: `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
	})) satisfies Array<{
		id: string;
		role: "user" | "assistant";
		text: string;
	}>;
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
	<Card.Root class="h-140 w-full gap-0 overflow-hidden">
		<Card.Header class="gap-1 border-b">
			<Card.Title>Scroll Status</Card.Title>
			<Card.Description>
				Where the reader can go scroll to based on current scroll position.
			</Card.Description>
		</Card.Header>
		<MessageScroller.Provider defaultScrollPosition="start">
			<Card.Content class="flex-1 overflow-hidden p-0">
				<MessageScroller.Root>
					<MessageScroller.Viewport>
						<MessageScroller.Content class="gap-4 p-(--card-spacing)">
							{#each messages as message (message.id)}
								<MessageAnimated
									{message}
									scrollAnchor={message.role === "user"}
									userVariant="muted"
									assistantVariant="ghost"
								/>
							{/each}
						</MessageScroller.Content>
					</MessageScroller.Viewport>
					<MessageScroller.Button />
				</MessageScroller.Root>
			</Card.Content>
			<ScrollStateFooter />
		</MessageScroller.Provider>
	</Card.Root>
	<div class="px-0.5 text-center text-xs text-muted-foreground">
		Scroll the transcript to see the footer update.
	</div>
</div>
