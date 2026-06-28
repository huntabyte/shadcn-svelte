<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble.Root variant="muted">
		<Bubble.Content>How can I help you today?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Group>
		<Bubble.Root variant="tinted" align="end">
			<Bubble.Content>
				{#snippet child({ props })}
					<button {...props} onclick={() => toast("You clicked forgot password")}>
						I forgot my password
					</button>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="tinted" align="end">
			<Bubble.Content>
				{#snippet child({ props })}
					<button {...props} onclick={() => toast("You clicked help with subscription")}>
						I need help with my subscription
					</button>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
		<Bubble.Root variant="tinted" align="end">
			<Bubble.Content>
				{#snippet child({ props })}
					<button
						{...props}
						onclick={() => toast("You clicked something else. Talk to a human.")}
					>
						Something else. Talk to a human.
					</button>
				{/snippet}
			</Bubble.Content>
		</Bubble.Root>
	</Bubble.Group>
</div>
