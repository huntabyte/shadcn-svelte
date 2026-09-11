<script lang="ts">
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import { toast } from "svelte-sonner";
	import { createChat, getMessageText } from "$lib/ai.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	const chat = createChat()
		.user("Can you summarize the incident channel?")
		.assistant(
			"The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
		)
		.user("Was checkout affected?")
		.assistant(
			"No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
		)
		.user("What changed in the last deploy?")
		.assistant(
			"Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
		)
		.user("Do we need to roll back?")
		.assistant(
			"Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
		)
		.user("Keep watching for customer-visible issues.")
		.assistant(
			"I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
		);

	const history = chat.get();
	const INITIAL_VISIBLE_COUNT = 5;

	let demoKey = $state(0);
	let visibleCount = $state(INITIAL_VISIBLE_COUNT);
	const visibleMessages = $derived(history.slice(-visibleCount));
	const canLoadHistory = $derived(visibleCount < history.length);
</script>

<MessageScroller.Provider>
	<div class="relative flex flex-col gap-4">
		<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
			<Card.Header class="gap-1 border-b">
				<Card.Title>Load History</Card.Title>
				<Card.Description>Prepended messages keep your place.</Card.Description>
				<Card.Action>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									type="button"
									variant="outline"
									size="icon"
									aria-label="Reset loaded messages"
									disabled={visibleCount === INITIAL_VISIBLE_COUNT}
									onclick={() => {
										visibleCount = INITIAL_VISIBLE_COUNT;
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
			<Card.Content class="flex-1 overflow-hidden p-0">
				{#key demoKey}
					<MessageScroller.Root>
						<MessageScroller.Viewport>
							<MessageScroller.Content class="p-(--card-spacing)">
								{#each visibleMessages as message (message.id)}
									{@const isUserMessage = message.role === "user"}
									{@const paragraphs = getMessageText(message)
										.split(/\n\s*\n/)
										.map((paragraph: string) => paragraph.trim())
										.filter(Boolean)}
									<MessageScroller.Item messageId={message.id}>
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
								<MessageScroller.Item scrollAnchor={false}>
									<Marker.Root variant="separator">
										<Marker.Content>End of Conversation</Marker.Content>
									</Marker.Root>
								</MessageScroller.Item>
							</MessageScroller.Content>
						</MessageScroller.Viewport>
						<MessageScroller.Button />
					</MessageScroller.Root>
				{/key}
			</Card.Content>
			<Card.Footer class="flex flex-col items-center gap-2 border-t">
				<Button
					type="button"
					disabled={!canLoadHistory}
					onclick={() => {
						visibleCount = history.length;
						toast("History loaded", {
							description: "Scroll up to see earlier messages.",
						});
					}}
					class="w-full"
					variant="secondary"
				>
					{canLoadHistory ? "Load History" : "History Loaded"}
				</Button>
				<p class="text-xs text-muted-foreground">Restore earlier messages while keeping your place.</p>
			</Card.Footer>
		</Card.Root>
		<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
			Click Load History to load the entire conversation
		</div>
	</div>
</MessageScroller.Provider>
