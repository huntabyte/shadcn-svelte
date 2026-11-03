<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Variants">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Root>
			<Bubble.Content>
				Default bubbles use the primary color for the active user side of a chat.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>
				Secondary bubbles are the standard neutral surface for assistant and conversation content.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>
				Muted bubbles lower the emphasis for quiet system notes or for displaying supporting
				content.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="tinted" align="end">
			<Bubble.Content>
				Tinted bubbles use a softer primary tint when primary fill is too strong.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="outline">
			<Bubble.Content>
				Outline bubbles can be used to frame message content and give it a border.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="destructive">
			<Bubble.Content>
				Destructive bubbles flag errors or failed actions in a conversation.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="ghost">
			<Bubble.Content>
				<span class="whitespace-pre-wrap">
					{`Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Ghost bubbles are full width and can take the full width of the container.
`}
				</span>
			</Bubble.Content>
		</Bubble.Root>
	</div>
</Example>
