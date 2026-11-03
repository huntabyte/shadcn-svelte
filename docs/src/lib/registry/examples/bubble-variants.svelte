<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import Markdown from "$lib/components/markdown/markdown.svelte";

	const ghost = `Ghost bubbles work for assistant text, **markdown**, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render \`code\` in it.

Ghost bubbles are full width and can take the full width of the container.
`;
</script>

<div class="flex w-full max-w-sm flex-col gap-12 py-12">
	<Bubble.Root>
		<Bubble.Content>This is the default primary bubble.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="secondary" align="end">
		<Bubble.Content>This is the secondary variant.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>
			This one is muted. It uses a lower emphasis color for the chat bubble.
		</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reaction: thumbs up">
			<span>👍</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="tinted" align="end">
		<Bubble.Content>
			This one is tinted. The tint is a softer color derived from the primary color.
		</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="outline">
		<Bubble.Content>We can also use an outlined variant.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="destructive" align="end">
		<Bubble.Content>Or a destructive variant with a reaction.</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reaction: fire">
			<span>🔥</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="ghost">
		<Bubble.Content>
			<Markdown content={ghost} />
		</Bubble.Content>
	</Bubble.Root>
</div>
