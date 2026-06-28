<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>
			This bubble is aligned to the start. This is the default alignment.
		</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root align="end">
		<Bubble.Content>
			This bubble is aligned to the end. Use this for user messages.
		</Bubble.Content>
	</Bubble.Root>
</div>
