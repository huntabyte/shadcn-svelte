<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Reaction Placement">
	<div class="flex w-full max-w-md flex-col gap-12">
		<Marker.Root variant="separator">
			<Marker.Content>side=bottom align=end</Marker.Content>
		</Marker.Root>
		<Bubble.Root>
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions side="bottom" align="end" role="img" aria-label="Reaction: thumbs up">
				<span>👍</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="secondary" align="end">
			<Bubble.Content>
				A longer message that wraps across lines so the reaction offset is easier to inspect.
			</Bubble.Content>
			<Bubble.Reactions
				side="bottom"
				align="start"
				role="img"
				aria-label="Reactions: thumbs up, surprised"
			>
				<span>👍</span>
				<span>😮</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="tinted">
			<Bubble.Content>
				A longer message that wraps across lines so the reaction offset is easier to inspect.
			</Bubble.Content>
			<Bubble.Reactions
				side="bottom"
				align="end"
				role="img"
				aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
			>
				<span>👍</span>
				<span>😮</span>
				<span>🔥</span>
				<span>👀</span>
				<span>+8</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Marker.Root variant="separator">
			<Marker.Content>side=bottom align=start</Marker.Content>
		</Marker.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions side="bottom" align="start" role="img" aria-label="Reaction: fire">
				<span>🔥</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>
				A longer message that wraps across lines so the reaction offset is easier to inspect.
			</Bubble.Content>
			<Bubble.Reactions
				side="bottom"
				align="start"
				role="img"
				aria-label="Reactions: thumbs up, surprised, fire, eyes"
			>
				<span>👍</span>
				<span>😮</span>
				<span>🔥</span>
				<span>👀</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Marker.Root variant="separator">
			<Marker.Content>side=top align=start</Marker.Content>
		</Marker.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions side="top" align="start" role="img" aria-label="Reaction: fire">
				<span>🔥</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="secondary">
			<Bubble.Content>
				A longer message that wraps across lines so the reaction offset is easier to inspect.
			</Bubble.Content>
			<Bubble.Reactions
				side="top"
				align="start"
				role="img"
				aria-label="Reactions: thumbs up, surprised, fire, eyes"
			>
				<span>👍</span>
				<span>😮</span>
				<span>🔥</span>
				<span>👀</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Marker.Root variant="separator">
			<Marker.Content>side=bottom align=end</Marker.Content>
		</Marker.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions side="top" align="end" role="img" aria-label="Reaction: thumbs up">
				<span>👍</span>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="muted">
			<Bubble.Content
				>A longer message that wraps across lines so the reaction offset.</Bubble.Content
			>
			<Bubble.Reactions
				side="top"
				align="end"
				role="img"
				aria-label="Reactions: thumbs up, surprised, fire, eyes"
				class="px-1.5 py-0.5"
			>
				<span>👍</span>
				<span>😮</span>
				<span>🔥</span>
				<span>👀</span>
			</Bubble.Reactions>
		</Bubble.Root>
	</div>
</Example>
