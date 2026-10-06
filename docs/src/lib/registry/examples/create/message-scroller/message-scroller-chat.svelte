<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { createChat, getMessageText } from "$lib/ai.js";
	import { createScriptedChat } from "$lib/ai.svelte.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const chat = createChat()
		.user("Hello there!")
		.sleep(2000)
		.assistant("Hey, how's it going?")
		.user(
			`I'm prototyping an AI chat surface for our product docs.

Can you sketch a sensible component breakdown and call out anything I'd regret baking into v1?`
		)
		.sleep(2000)
		.assistant(
			`## Recommended layout

Treat the chat as three layers so scrolling and the composer never fight each other:

| Layer | Responsibility |
| --- | --- |
| **Shell** | Card or page frame, title, status indicator |
| **Transcript** | \`overflow-y-auto\` message list |
| **Composer** | Input group, send, stop |

### Message rendering

- **User messages**: right-aligned, muted background, \`max-w-[80%]\`.
- **Assistant messages**: full width within the column; use \`whitespace-pre-wrap\` for text.

### Suggested component split

\`\`\`svelte
<ChatCard>
  <ChatHeader status={status} />
  <ChatTranscript messages={messages} />
  <ChatComposer onSubmit={sendMessage} onStop={stop} />
</ChatCard>
\`\`\`

### v1 pitfalls to avoid

1. **Inlining transport logic in the UI** — keep scripted/demo transport beside your example, not inside shared components.
2. **Fixed transcript height without \`overflow-hidden\`** — parent must clip, child must scroll, or the composer jumps.
3. **Not giving the scroller a ref or auto-scroll flag** — long replies should stay pinned to the bottom unless the user scrolls up.

### Practical next step

Start with plain \`whitespace-pre-wrap\` text to validate spacing and scroll behavior. Once the transcript feels right, you can swap assistant text rendering to a richer renderer if you need it.

Want me to walk through auto-scroll vs. manual scroll-to-bottom next?`
		)
		.user("What about message spacing when one reply is short and the next is really long?")
		.sleep(2000)
		.assistant(
			`Good question. The scroll container should own vertical rhythm, not individual bubbles.

Use a consistent \`gap\` on the message list (something like \`gap-4\` or \`gap-6\`) so short and long messages sit on the same grid. For assistant replies that span many paragraphs, keep everything in one bubble rather than splitting on every line break — otherwise the transcript feels choppy when you're skimming.

When a long reply streams in, pin the viewport to the bottom with \`MessageScroller autoScroll\` until the user scrolls up. If they've scrolled away, show a scroll-to-bottom affordance instead of yanking them back mid-read.

That's usually enough for v1. Fancy diff animations or per-paragraph fade-ins can wait until you've validated that the base scroll + composer layout holds up on real devices.`
		)
		.user("Thanks, that helps.")
		.sleep(1000)
		.assistant(
			"Happy to help — send another message when you're ready to keep stepping through the demo."
		);

	const initialMessages = chat.get(0);
	const transport = chat.transport({ delayMs: 10 });
	const demo = createScriptedChat({ chat, transport, initialMessages });
	const nextMessage = $derived(chat.next(demo.messages));
	const isBusy = $derived(demo.status === "submitted" || demo.status === "streaming");

	function handleFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!nextMessage || isBusy) {
			return;
		}
		void demo.sendMessage(nextMessage);
	}
</script>

<Example title="Chat" containerClass="self-start">
	<Card.Root class="h-140">
		<Card.Header>
			<Card.Title>How can I help you today?</Card.Title>
			<Card.Description>Status: {demo.status}</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 overflow-hidden p-0">
			<MessageScroller.Provider>
				<MessageScroller.Root>
					<MessageScroller.Viewport>
						<MessageScroller.Content class="p-(--card-spacing)">
							{#each demo.messages as message (message.id)}
								<MessageScroller.Item messageId={message.id} scrollAnchor={message.role === "user"}>
									<Message.Root align={message.role === "user" ? "end" : "start"}>
										<Message.Content>
											{#each message.parts as part, index (index)}
												{#if part.type === "text"}
													<Bubble.Root variant={message.role === "user" ? "default" : "muted"}>
														<Bubble.Content class="whitespace-pre-wrap">
															{part.text}
														</Bubble.Content>
													</Bubble.Root>
												{/if}
											{/each}
										</Message.Content>
									</Message.Root>
								</MessageScroller.Item>
							{/each}
							{#if demo.status === "submitted"}
								<MessageScroller.Item scrollAnchor={false}>
									<Marker.Root role="status">
										<Marker.Icon>
											<Spinner />
										</Marker.Icon>
										<Marker.Content>Thinking...</Marker.Content>
									</Marker.Root>
								</MessageScroller.Item>
							{/if}
						</MessageScroller.Content>
					</MessageScroller.Viewport>
					<MessageScroller.Button />
				</MessageScroller.Root>
			</MessageScroller.Provider>
		</Card.Content>
		<Card.Footer>
			<form onsubmit={handleFormSubmit} class="w-full" id="chat-form">
				<InputGroup.Root>
					<InputGroup.Textarea
						placeholder="Ask me anything..."
						class="h-10 min-h-10 overflow-y-auto"
						value={isBusy ? "" : nextMessage ? getMessageText(nextMessage) : ""}
						readonly
					/>
					<InputGroup.Addon align="block-end" class="p-2">
						<InputGroup.Button
							variant="default"
							size="icon-sm"
							type="submit"
							disabled={!nextMessage || isBusy}
							class="ml-auto data-[hidden=true]:hidden"
							data-hidden={isBusy}
						>
							<IconPlaceholder
								lucide="ArrowUpIcon"
								tabler="IconArrowUp"
								hugeicons="ArrowUp02Icon"
								phosphor="ArrowUpIcon"
								remixicon="RiArrowUpLine"
							/>
							<span class="sr-only">Send</span>
						</InputGroup.Button>
						<InputGroup.Button
							size="icon-sm"
							type="button"
							data-hidden={!isBusy}
							class="ml-auto data-[hidden=true]:hidden"
							onclick={() => demo.stop()}
						>
							<IconPlaceholder
								lucide="StopCircleIcon"
								tabler="IconPlayerStop"
								hugeicons="StopCircleIcon"
								phosphor="StopCircleIcon"
								remixicon="RiStopCircleLine"
							/>
							<span class="sr-only">Stop</span>
						</InputGroup.Button>
					</InputGroup.Addon>
				</InputGroup.Root>
			</form>
		</Card.Footer>
	</Card.Root>
</Example>
