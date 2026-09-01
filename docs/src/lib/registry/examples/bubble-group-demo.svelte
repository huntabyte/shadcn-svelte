<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>Can you tell me what&apos;s the issue?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		<Bubble.Root align="end"><Bubble.Content>You tell me!</Bubble.Content></Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>It worked yesterday. You broke it!</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>Find the bug and fix it.</Bubble.Content>
			<Bubble.Reactions aria-label="Reactions: eyes" align="start"
				><span>👀</span></Bubble.Reactions
			>
		</Bubble.Root>
	</Bubble.Group>
	<Bubble.Root variant="muted">
		<Bubble.Content>
			Want me to diff yesterday&apos;s you against today&apos;s you? It&apos;s a bit
			embarrassing.
		</Bubble.Content>
	</Bubble.Root>
</div>
