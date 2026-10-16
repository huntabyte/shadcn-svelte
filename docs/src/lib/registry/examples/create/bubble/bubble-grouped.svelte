<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Grouped">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Group>
			<Bubble.Root variant="secondary">
				<Bubble.Content>I finished the audit pass.</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content
					>The registry output looks clean, but I found one stale route.</Bubble.Content
				>
			</Bubble.Root>
			<Bubble.Root variant="secondary">
				<Bubble.Content>Want me to remove it now?</Bubble.Content>
			</Bubble.Root>
		</Bubble.Group>
		<Bubble.Group>
			<Bubble.Root variant="tinted" align="end">
				<Bubble.Content>Yes, clean that up.</Bubble.Content>
			</Bubble.Root>
			<Bubble.Root variant="tinted" align="end">
				<Bubble.Content>Then rerun the registry build.</Bubble.Content>
			</Bubble.Root>
		</Bubble.Group>
	</div>
</Example>
