<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>Can you tell me what the issue is?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		<Bubble.Root align="end">
			<Bubble.Content>The preview worked yesterday.</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>Find the missing export and fix it.</Bubble.Content>
			<Bubble.Reactions aria-label="Reactions: eyes" align="start">
				<span>+1</span>
			</Bubble.Reactions>
		</Bubble.Root>
	</Bubble.Group>
	<Bubble.Root variant="muted">
		<Bubble.Content>I found the stale registry entry.</Bubble.Content>
	</Bubble.Root>
</div>
