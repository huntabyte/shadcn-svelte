<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root align="end">
		<Bubble.Content>Hey there! what's up?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		<Bubble.Root variant="muted">
			<Bubble.Content>Hey! Want to see chat bubbles?</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>
				I can group messages, switch sides, and keep the whole thread easy to scan.
			</Bubble.Content>
			<Bubble.Reactions role="img" aria-label="Reaction: thumbs up">
				<span>👍</span>
			</Bubble.Reactions>
		</Bubble.Root>
	</Bubble.Group>
	<Bubble.Root align="end">
		<Bubble.Content>Sure. Hit me with your best demo.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>
			Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
		</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
			<span>👍</span>
			<span>🔥</span>
			<span>👀</span>
			<span>+2</span>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
