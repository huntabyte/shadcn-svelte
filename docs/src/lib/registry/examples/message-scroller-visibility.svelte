<script lang="ts">
	import { createChat, getMessageText } from "$lib/ai.js";
	import VisibilityOutline from "$lib/components/message-scroller/visibility-outline.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	const chat = createChat()
		.user("Review the incident handoff and tell me what to read first.", {
			id: "vis-brief",
		})
		.assistant(
			"Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job."
		)
		.user("What was the customer impact?", {
			id: "vis-impact",
		})
		.assistant(
			"Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors."
		)
		.user("What actions are open?", {
			id: "vis-actions",
		})
		.assistant(
			"Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
		)
		.user("Give me the follow-up checklist.", {
			id: "vis-checklist",
		})
		.assistant(
			"After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
		);

	const messages = chat.get();
	const userMessages = messages.filter((message) => message.role === "user");
</script>

<MessageScroller.Provider scrollMargin={12}>
	<div class="relative flex flex-col gap-4">
		<div class="relative mx-auto w-full max-w-sm">
			<Card.Root class="h-140 w-full gap-0">
				<Card.Header class="gap-1 border-b">
					<Card.Title>Transcript Outline</Card.Title>
					<Card.Description>Track the current anchored turn.</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1 overflow-hidden p-0">
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content class="p-(--card-spacing)">
								{#each messages as message (message.id)}
									{@const isUserMessage = message.role === "user"}
									{@const text = getMessageText(message)}
									{@const paragraphs = text
										.split(/\n\s*\n/)
										.map((paragraph: string) => paragraph.trim())
										.filter(Boolean)}
									<MessageScroller.Item messageId={message.id} scrollAnchor={isUserMessage}>
										<Message.Root align={isUserMessage ? "end" : "start"}>
											<Message.Content>
												<Bubble.Root variant={isUserMessage ? "muted" : "ghost"}>
													<Bubble.Content class="space-y-2">
														{#each paragraphs as paragraph, index (`${message.id}-${index}`)}
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
				</Card.Content>
			</Card.Root>
			<div class="absolute top-1/2 -right-12 -translate-y-1/2">
				<VisibilityOutline {userMessages} />
			</div>
		</div>
		<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
			Open the outline to jump between anchored turns as you read.
		</div>
	</div>
</MessageScroller.Provider>
