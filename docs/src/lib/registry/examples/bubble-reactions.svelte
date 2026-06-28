<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-12 py-12">
	<Bubble.Root variant="muted" align="end">
		<Bubble.Content>I don't need tests, I know my code works.</Bubble.Content>
		<Bubble.Reactions align="start" role="img" aria-label="Reactions: thumbs up and surprised">
			<span>👍</span>
			<span>😮</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>
			Bold. Fine I'll add some tests. I'll let you know when they're done.
		</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
			<span>👀</span>
			<span>🚀</span>
			<span>+2</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="default" align="end">
		<Bubble.Content>
			Tests passed on the first try. All 142 of them. Looking good!
		</Bubble.Content>
		<Bubble.Reactions
			side="top"
			align="start"
			role="img"
			aria-label="Reactions: party popper, clapping hands"
		>
			<span>🎉</span>
			<span>👏</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="destructive">
		<Bubble.Content>Are you sure I can run this command?</Bubble.Content>
		<Bubble.Reactions>
			<Button variant="ghost" size="xs">Yes, run it</Button>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
