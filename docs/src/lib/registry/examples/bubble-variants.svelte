<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root>
		<Bubble.Content>This is the default primary bubble.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="secondary" align="end">
		<Bubble.Content>This is the secondary variant.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="muted">
		<Bubble.Content>This one uses a lower emphasis color.</Bubble.Content>
		<Bubble.Reactions role="img" aria-label="Reaction: thumbs up">
			<span>+1</span>
		</Bubble.Reactions>
	</Bubble.Root>
	<Bubble.Root variant="tinted" align="end">
		<Bubble.Content>This one uses a softer primary tint.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="outline">
		<Bubble.Content>Outlined bubbles work well for secondary content.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="destructive" align="end">
		<Bubble.Content>Use destructive bubbles for error context.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="ghost">
		<Bubble.Content>
			Ghost bubbles remove the frame, so assistant text and rich content can fill the row.
		</Bubble.Content>
	</Bubble.Root>
</div>
