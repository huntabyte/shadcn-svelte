<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Sizes">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Root>
			<Bubble.Content>This is a one line bubble.</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root>
			<Bubble.Content>
				This bubble has multiple lines. It should wrap to the next line and you should see a
				different radius on the corners.
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root>
			<Bubble.Content>
				<p>This bubble has multiple lines.</p>
				<p>It should wrap to the next line and you should see a different radius on the corners.</p>
				<p>Here is some more text to see how it wraps.</p>
			</Bubble.Content>
		</Bubble.Root>
	</div>
</Example>
