<script lang="ts">
	import { createChat, getMessageText } from "$lib/ai.js";
	import CommandsMenu from "$lib/components/message-scroller/commands-menu.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	const chat = createChat()
		.user("We're seeing activation dip after workspace creation. Can you help me find the likely step?", {
			id: "command-activation",
		})
		.assistant(
			"The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace."
		)
		.user("What should I compare before we change the onboarding flow?", {
			id: "command-compare",
		})
		.assistant(
			"Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt."
		)
		.user("Can you turn that into an experiment?", {
			id: "command-experiment",
		})
		.assistant(
			"Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project."
		)
		.user("What's the risk if we delay the invite prompt?", {
			id: "command-risk",
		})
		.assistant(
			"The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early."
		);

	const messages = chat.get();
	const userMessages = messages.filter((message) => message.role === "user");
</script>

<MessageScroller.Provider defaultScrollPosition="end">
	<div class="relative flex flex-col gap-4">
		<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
			<Card.Header class="gap-1 border-b">
				<Card.Title>Commands</Card.Title>
				<Card.Description>Drive the transcript from outside.</Card.Description>
				<Card.Action>
					<CommandsMenu {userMessages} />
				</Card.Action>
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
		<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
			Use the controls to jump to any message in the conversation.
		</div>
	</div>
</MessageScroller.Provider>
