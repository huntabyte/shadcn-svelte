<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root align="end">
		<Bubble.Content>Hey there. What's up?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		<Bubble.Root variant="muted">
			<Bubble.Content>Want to see chat bubbles?</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>
				I can group messages, switch sides, and keep the thread easy to scan.
			</Bubble.Content>
			<Bubble.Reactions role="img" aria-label="Reaction: thumbs up">
				<span>+1</span>
			</Bubble.Reactions>
		</Bubble.Root>
	</Bubble.Group>
	<Bubble.Root align="end">
		<Bubble.Content>Sure. Show me the demo.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>
			This bubble includes reactions anchored to the edge of the message surface.
		</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
			<span>+5</span>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
