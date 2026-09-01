<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";

	const actions = [
		"I forgot my password",
		"I need help with my subscription",
		"Something else. Talk to a human.",
	];
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>How can I help you today?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		{#each actions as action (action)}
			<Bubble.Root variant="tinted" align="end">
				<Bubble.Content>
					{#snippet child({ props })}
						<button
							{...props}
							onclick={() => toast(`You clicked ${action.toLowerCase()}`)}
						>
							{action}
						</button>
					{/snippet}
				</Bubble.Content>
			</Bubble.Root>
		{/each}
	</Bubble.Group>
</div>
