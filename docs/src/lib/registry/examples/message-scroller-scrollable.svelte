<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import ScrollStateFooter from "$lib/components/message-scroller/scrollable-footer.svelte";
	import Transcript from "$lib/components/message-scroller/scrollable-transcript.svelte";
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
							<Transcript />
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
