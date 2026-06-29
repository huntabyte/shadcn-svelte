<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<Example title="Markdown">
	<div class="flex w-full max-w-sm flex-col gap-8 py-12">
		<Bubble.Root align="end" variant="muted">
			<Bubble.Content>
				Hello! Are you actually <strong>thinking</strong>?
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="ghost">
			<Bubble.Content>
				<div class="space-y-4">
					<p>
						Ghost bubbles work for assistant text, <strong>markdown</strong>, and other
						content that should not be framed.
					</p>
					<p>
						This is perfect for assistant messages that should not have a frame and can
						take the full width of the container. You can also render
						<code>code</code> in it.
					</p>
					<p>
						Ghost bubbles are full width and can take the full width of the container.
					</p>
				</div>
			</Bubble.Content>
		</Bubble.Root>
	</div>
</Example>
