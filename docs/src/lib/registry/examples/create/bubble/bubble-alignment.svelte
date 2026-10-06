<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Alignment">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Root variant="muted">
			<Bubble.Content>This bubble is aligned to the start.</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>This bubble is aligned to the end.</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>
				This multiline bubble is aligned to the start. The corners should adjust when the text wraps
				to show the grouped side of the conversation.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>
				This multiline bubble is aligned to the end. It should sit on the opposite side with the
				matching corner radius for wrapped text.
			</Bubble.Content>
		</Bubble.Root>
	</div>
</Example>
