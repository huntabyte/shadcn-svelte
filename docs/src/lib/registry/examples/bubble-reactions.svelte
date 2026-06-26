<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-12 py-12">
	<Bubble.Root variant="muted" align="end">
		<Bubble.Content>I know this change works.</Bubble.Content>
		<Bubble.Reactions align="start" role="img" aria-label="Reactions: thumbs up and surprised">
			<span>+2</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>Good. I still added tests.</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
			<span>+4</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="default" align="end">
		<Bubble.Content>Tests passed. Ship it.</Bubble.Content>
		<Bubble.Reactions side="top" align="start" role="img" aria-label="Reactions: celebration">
			<span>+3</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="destructive">
		<Bubble.Content>Run the command anyway?</Bubble.Content>
		<Bubble.Reactions>
			<Button variant="ghost" size="xs">No</Button>
			<Button variant="ghost" size="xs">Run</Button>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
